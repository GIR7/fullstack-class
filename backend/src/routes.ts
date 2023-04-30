import app from "./app.js";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";

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
	
	//sending data to sever,create a new user
	app.post
	<{//explicitly tell fastify that req.body has 3 field and their type : our own version of FasityRequest
		Body:{
			name:string,
			email:string,
			petType:string
		}
	}>
	("/users",async (req , res)=>{
		//extract 3 fileds from request, get the info that user send in
		const {name,email,petType} = req.body;
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
}

export default doggrRoutes;
