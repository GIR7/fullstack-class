
//Week2 Wed, 2nd part:
import fs from "fs/promises";

//let app = Fastity()
//mimic fastify, write our own server
import http from "http";
import path from "path";
import {addsOnRequest} from "./request.js";
import {addsOnResponse} from "./response.js";

//a nastify obj has a listen func in it.
export function Nastify(){
	 function listen(port = 7777, argcallback){
		return http
			.createServer(async (req,res)=>{
			//we want to add more metadata/features to "req" and "res"
				addsOnRequest(req);//from request.js
				addsOnResponse(res);//from response.js
				
				
				//below is same create server code from index.ts
			const indexFile = await fs
					.readFile(path.resolve(__dirname, "public", "index.html"))
					.catch((err) => {
						console.error(err);
						//send error result - 500!
						res.setHeader("Content-Type", "text/html");
						res.writeHead(500);
						return res.end(err);
					});
			
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				return res.end(indexFile);
			})
			
			//
			.listen({ port }, () => {
				//in JS,just making sure the argcallback being passed in is a Function
				//TS: has static typing, no need to check
				if (argcallback) {
					if (typeof argcallback === "function") {
						return argcallback();
					}
					throw new Error("Listen callback needs to be a function");
				}
			});
	}
	
	
	
	// function addOne(input){
	// 	return input+1;
	// }
	return { //returns  listen function
		listen
		//, addOne
	};
}

