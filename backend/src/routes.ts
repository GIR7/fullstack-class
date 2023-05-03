import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import { Match } from "./db/entities/Match.js";
import {ICreateUsersBody} from "./types.js";


//taking the "app", adding the routes
async function doggrRoutes(app: FastifyInstance,_options={} ){
	if(!app){
		throw new Error("Fastify instance has no value during routes construcation...")
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'Hilo';
	});
	
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	
	
	
	//CRUD
	
	//C: sending data to sever,create a new user
	app.post
	// <{//explicitly tell fastify that req.body has 3 field and their type : our own version of FasityRequest
	// 	Body:{
	// 		name:string,
	// 		email:string,
	// 		petType:string
	// 	}
	// }>
	<{Body: ICreateUsersBody}>
	("/users",async (req , res)=>{
		
		//extract 3 fileds from request, get the info that user send in
		const {name,email,petType} = req.body;
		console.log("vars: ",{name,email,petType});
		console.log("Body",req.body);
		//take the info that user gaves us, then build a DB user.
		try{
			//creates in the mikro-orm, not in actual db
			const newUser = await req.em.create(User,{
				name,
				email,
				petType
			});
			
			//persist it to our actual db
			await  req.em.flush();
			
			console.log("Created new User: ", newUser);
			return res.send(newUser);//send user back to our request so they know the user they give is a valid user
		}catch (err){
			console.log("Failed to create a new user: ", err.message);
			return res.status(500).send({message: err.message});//send back status code and error msg
		}
		
	})
	
	
	//can't send data along with GET method...so we are going to use SEARCH,which is not built-in in fastify
	// app.route<{Body:{email:string}}>({
	// 	method: "SEARCH",
	// 	url: "/users",
	// 	handler:async (req,res)=>{
	// 		//get the  email that request(user) send in.
	// 		const {email} = req.body;
	// 		try{
	// 			const findUser = await req.em.findOne(User,{email});
	// 			console.log(findUser);
	// 			//send it back
	// 			res.send(findUser);
	// 		} catch (err){
	// 			console.error(err);
	// 			res.status(500).send(err);
	// 		}
	// 	}
	// })
	
	//now we are having our own search plugins
	//search: for a GET req that has body with it
	//R: find a user
	app.search("/users",async (req,res)=>{
		//get the email we want to find from request(user)
		const { email } = req.body;

		try{
			const findUser = await req.em.findOne(User, { email })
			console.log(findUser);
			res.send(findUser);
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	})
	
	//Update: change sth are already there
	app.put
	// <{
	// 	Body:{
	// 		name:string,
	// 		email:string,
	// 		petType:string
	// 	}
	// }>
	<{Body: ICreateUsersBody}>
	("/users",async(req,res)=>{
		const {name, email,petType} = req.body;
		
		try {
			const userChange = await req.em.findOne(User, {email});
			userChange.name = name;
			userChange.petType = petType;
			//store into db
			await req.em.flush();
			
			console.log(userChange);
			res.send(userChange);
		}catch (e){
			console.error(e);
			res.status(500).send(e);
		}
	})
	
	//Delete
	app.delete<{ Body: {email}}>
	("/users",async (req,res)=>{
		const { email } = await req.body;
		
		try {
			const userDelete = await req.em.findOne(User,{email});
			//delete user in db
			await req.em.remove(userDelete).flush();
			
			console.log("Delete the user: ",userDelete);
			res.send(userDelete);
		}catch (e){
			console.error(e);
			res.status(500).send(e);
		}
	})

	//create match
	app.post<{Body:{ email:string, matchee_email:string }}>
	("/match",async (req,res)=>{

		console.log("body :",req.body);

		//extracts data from request body
		const {email,matchee_email}=req.body;
		console.log("{email:matchee_email}: ",{email:matchee_email});
		console.log("{email}: ",{email});
		try {
			//make sure matchee exists & get their user account
			const matchee = await req.em.findOne(User, {email:matchee_email});
			console.log("matchee: ",matchee)
			//same for owner(matcher)
			const owner = await req.em.findOne(User, {email});
			
			console.log("owner: ",owner)
			//create a new match between them
			const newMatch = await req.em.create(Match, {
				owner,
				matchee
			});

			//persist it to thte db
			await req.em.flush();

			//send the match back to user
			return res.send(newMatch)
		}catch (e) {
			console.error(e);
			return res.status(500).send(e);
		}
	})
}

export default doggrRoutes;
