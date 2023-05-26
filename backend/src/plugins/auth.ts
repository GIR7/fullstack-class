import dotenv from "dotenv";
dotenv.config();
import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import Jwt, {VerifyPayloadType} from "@fastify/jwt";
import fp from "fastify-plugin";

declare module 'fastify' {
	interface FastifyRequest {
		// You can easily find the type of this return using intellisense inferral below
		jwtVerify(): Promise<VerifyPayloadType>
	}
	interface FastifyInstance {
		//we want to expose to all of our routes
		auth(): void,
	}
}

//build our own plugins. we also need to register it
export const AuthPlugin = fp(async function (app:FastifyInstance,opts:FastifyPluginOptions){
	app.register(import("@fastify/jwt"), {
		//used as salt, give it to jwt plugin
		secret: process.env.AUTH_SECRET
	});
	
	
	app.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
		try {
			//verify the jwt from the request that send to us
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	})
})
