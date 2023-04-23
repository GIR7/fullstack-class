//Week3 Monday's lecture

//Add Fastify
//Add database

import Fastify, {FastifyReply,FastifyRequest} from "fastify";
import dotenv from "dotenv";
import {User} from "./db/entities/User.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";

dotenv.config();
import config from "./db/mikro-orm.config.js"

let app = Fastify();

//let fastify adds the plugins
await app.register(FastifyMikroOrmPlugin,config)

app.get("/hello",async (req,res)=>{
	return 'hello';
})
app.get("/hello2",async (req,res)=>{
	return 'hello2';
})

app.get("/tbTest",async (req, res)=>{
	return req.em.find(User,{});
})

app.listen({port:8080},(err,address)=>{
	if(err){
		console.error(err);
		process.exit(1);
	}
	console.log(`Server starts on ${address}`);
})
