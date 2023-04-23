//build our own plugins for Fastify

import {MikroORM, Options} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/postgresql";

import type {FastifyPluginAsync} from "fastify";
import fp from "fastify-plugin";

// A type that represents deeply nested structure (A value inside a promise) and extracts (safely) the inner value
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

//allows us to overrite the types: when add the new field to the fastify obj, its type get changes too
declare module 'fastify' {
	interface FastifyInstance {
		//db fileds type
		db: Awaited<ReturnType<(typeof MikroORM)["init"]>>;
	}
	interface FastifyRequest {
		db: Awaited<ReturnType<(typeof MikroORM)["init"]>>,
		em: EntityManager | undefined;
	}
}

export const fastifyMikroORMCore = async function (fastify,options) {
	//initialize the ORM, options: would be db ralated
	const db = await MikroORM.init(options);
	//we don't handle err here cause if we can't connect to db, then we can't do anything but just let it broken
	
	
	//adding new our own field(db) to a fasify instance
	fastify.decorate("db",db);//
	
	//watch for incoming request, and then copy all of our cache to individual request.db. then perform action, would not effect master db
	fastify.addHook("onrequest", async function(this:typeof fastify, request, reply){
		request.db = Object.assign({},this.db)//copy the db to the request.db
		// Must fork context as per https://mikro-orm.io/docs/identity-map/
		request.em = request.db.em.fork() as EntityManager;
	});
	
	//when finish with the request, close the db
	fastify.addHook("onclose",()=>{
		db.close();
	})
	
};

export const FastifyMikroOrmPlugin= fp(fastifyMikroORMCore,{
	name:"fastify-mikro-orm"
})
