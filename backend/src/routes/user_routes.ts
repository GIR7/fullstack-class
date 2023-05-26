import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import bcrypt from "bcrypt";


export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});
	
	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", { onRequest: [app.auth]}, async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	
	// User CRUD
	// Refactor note - We DO use email still for creation!  We can't know the ID yet
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		const { name, email, password, petType } = req.body;
		
		//fish our pw out and hash it first then put it into our db
		
		const hashedPw = await bcrypt.hash(password, 10);
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				password:hashedPw,
				petType,
				// We'll only create Admins manually!
				role: UserRole.USER
			});
			
			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	//READ
	app.search("/users", async (req, reply) => {
		const { id } = req.body;
		
		try {
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	
	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, petType } = req.body;
		
		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;
		userToChange.petType = petType;
		
		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});
	
	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number, password: string } }>("/users", async (req, reply) => {
		const { my_id, id_to_delete, password } = req.body;
		
		try {
			// Authenticate my user's role
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});
			// Check passwords match
			if (me.password !== password) {
				return reply.status(401).send();
			}
			
			// Make sure the requester is an Admin
			if (me.role === UserRole.USER) {
				return reply.status(401).send({ "message": "You are not an admin!"})
			}
			
			const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, {strict: true});
			
			//Make sure the to-be-deleted user isn't an admin
			if (theUserToDelete.role === UserRole.ADMIN) {
				return reply.status(401).send({ "message": "You do not have enough privileges to delete an Admin!"})
			}
			
			await req.em.remove(theUserToDelete).flush();
			return reply.send(theUserToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});
	
	/*Login : Auth
		1) User attempts to create a new account and enters username and password into some User Create page
		2) Server takes password, salt/hashes/encrypts, store the resulting password in our Users table in the database
		3) User attempts to login to previously created account and enters username and password into a Login page
		4) Server retrieves the user from our database, then uses bcrypt's compare function to compare it to the user's entered password
		5) Server creates JWT token and passes it back to the client.
		6) Frontend then sends JWT in all subsequent requests, NEVER their actual password again!  Thanks to the magic
			 of JWTs, we can thusly avoid EVER retrieving the user's password from a database again.
		 */
	
	app.post<{Body:{email:string,password:string}}>("/login",async(req,res)=>{
		const {email, password} = req.body;
		
		try{
			const theuser = await req.em.findOneOrFail(User,{email},{strict:true});
			
			//compare the pw(plain text) that user entered with the hash salted pw stored  in our db
			const hashCompare = await bcrypt.compare(password, theuser.password)
			if(hashCompare){//if its the same pw
				//generate a jwt token and send it back
				
				//get id(prefered) from db
				const userId = theuser.id;
				//"store" the id into our token
				const token = app.jwt.sign({userId});
				//send back our token, when a user logins, frontend would get this token contains user id
				res.send( { token });
			}
			else{
				console.log("incorrect password!");
				res.status(401).send("Wrong password!");
			}
		}catch(e){
			res.status(501).send(e);
		}
	})
	
}
