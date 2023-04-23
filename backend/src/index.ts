
import  fs from "fs/promises";
import  dotdev from "dotenv";
dotdev.config();

import http, {Server} from "http";
import path from "path";

import { fileURLToPath } from 'url';
import {Nastify} from "./server.js";
import ErrnoException = NodeJS.ErrnoException;

//Week2 Wednesday's lecture:
//2nd part: testing our own Nastify
let testapp = Nastify();
testapp.listen(7777,()=>{
	console.log("This is Nastify sever, listening on port 7777");
})
//check done, works



//1ST part of lecture

// ES Modules argh https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server: Server = http.createServer(async (req,res)=>{
	//navigate this file's path to index.html 's path
	//this is for "fs
	// fs.readFile(path.resolve(__dirname,"..","public","index.html"),(err,data:Buffer)=>{
	// 	res.setHeader('Content-type','text/html');
	// 	if(err){
	// 		console.log(err);
	// 		res.writehead(200);
	// 		return res.end('File read error : ');
	// 	}
	// 	res.writeHead(200);
	// 	return res.end(data);
	// })
	
	//this is for "fs/promises"
	let haserr = false; //(bad way )fix the return
	const indexFile = await fs.readFile(path.resolve(__dirname,'..', 'public', 'index.html'))
	// 	.catch( err =>  {
	// 		console.error(err);
	// 		//send error result - 500!
	// 		res.setHeader('Content-Type', 'text/html');
	// 		res.writeHead(500);
	// 		//this return is only for 'catch' block, not the whole func,
	// 		return res.end(JSON.stringify(err));//we can only returns to client a str,err is JS obj
	// 	});
	// res.setHeader("Content-Type",'text/html');
	// res.writeHead(200);
	// return res.end(indexFile);
		.catch( err =>  {
			console.error(err);
			//send error result - 500!
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(500);
			haserr = true;
			return err;
			
		});
	if(!haserr){
		res.setHeader("Content-Type",'text/html');
		res.writeHead(200);
		return res.end(indexFile);
	}else {
		return res.end(JSON.stringify(indexFile));//we can only returns to client a str,err is JS obj
	}
})



//Week2, Monday's class: 2nd part

const apiurl = "https://catfact.ninja/fact";
const netData = url =>{
	return new Promise((resolve, reject) => {
		let request = fetch(url)
			.then(res=>{
				console.log(res);
				if(res.status === 200){
					resolve(res);
				}else{
					reject(res.status);
				}
			})
			.catch(err=>{
				console.log("unable to fetch ",err);
				reject(err);
			})
	});
}
//The wrong way
// res.json(): Promise {<pending>}
// netData(apiurl)
// 	.then(res=>{
// 		console.log(res.json())
// 	})
// 	.catch(err=>console.error(err))
// 	.finally(()=>console.log("finished request in finally"));

//The right way, example of using Promise
netData(apiurl)
	.then((res):Promise<JSON>=>{
		console.log("initial response is : ",res)
		return res.json();
	})
	.then((json)=>{
		console.log("JSON body is  ",json);
	})
	.catch((err)=>console.error(err))
	.finally(()=>console.log("Done"));

//same func def
// const netData = function(url){
// 	return new Promise();
// }


//aync await ex.
let dbReady =()=>{
	return new Promise(resolve => {
		//pretend doing db stuff, takes 2sec
		setTimeout(()=>resolve("database is ready"),2000);
	})
}
let dbConne =(status)=>{
	return new Promise(resolve => {
		//pretend doing db stuff, takes 2sec
		setTimeout(()=>resolve("database is ready"),2000);
	})
}
let dbQuery =(connect)=>{
	return new Promise(resolve => {
		//pretend doing db stuff, takes 2sec
		setTimeout(()=>resolve("database is ready"),2000);
	})
}
//The wrong way
// function checkDb(){
// 	const dbStatus = dbReady();
// 	console.log(dbStatus);
// 	return dbStatus;
// }

//The right way:
//1st await runs first, then 2nd, then 3rd
//"Function colorig:" async func can ONLY communicate with async func
async function checkDb(){
	try {
		const dbStatus = await dbReady();//pausing this func(checkDb) at here, wait it(dbReady()) to finished
		console.log(dbStatus);
		const Conne = await dbConne(dbStatus);
		const Query = await dbQuery(Conne);
		return dbStatus;
	}catch(err){
		console.log(err);
	}finally {
		console.log("DONE ...");
	}
}

checkDb();


//Server:
//1.accept incoming requests
//2. figue out which type of the request it is -- GET POST PUT DELETE
//3. make nay changes or assemble any requested resources
//4. send back the response with status code and data
//5. close connection



//old, need to using callback
// const server = http.createServer((req,res)=>{
// 	console.log("I got the request from a client..")
// 	//res: things you are sending back to client as a server
// 	res.writeHead(200,{"Content-Type":"text/html"})
// 	res.write("Hello World! I got your request, this is my response");
// 	res.end();
// })

server.listen(process.env.BACKEND_PORT,()=>{
	console.log("Server listening on port 8080... ")
})





//Week2, Monday's class: 1st part
// //js only runs on single thread
// import * as console from "console";
//
// console.log("hello");
// console.log("world!");
//
// //we can make our own threads in js
// function GetUser(userId,callback){
// 	let foundUser = DelayedGet(userId) //pretend this takes 30sec
// 	//asyc func: wait 5 sec, then call the "callback()"
// 	setTimeout(()=>{
// 		callback(foundUser);
// 	},5000);
// }
//
// //callback:we can store any func into this "callback" parameter that we can use this func later on
// //assign a func to anather var,not calling the func, just store it to a var
// let Myvar = GetUser;
//
//
//
// //"callback hell"
// function GetalluserInfo(userId,callback){
// 	let user = GetUser("email.com",(user)=>{
// 		console.log("hi")
// 		if(user){
// 			GetuserCountry(user,(country)=>{
// 				if(country){
// 					GetuserState(country,(state)=>{
// 						if(state){
// 							Getusercity(state,(city)=>{
// 								if(city){
// 									console.log("We have all the info")
// 								}
// 							})
// 						}
// 					})
// 				}
// 			})
// 		}
// 	})
// }
//
// //promises: converting a callback to nicer form
// //resolve : promise success, reject: failed
// let userPromise = new Promise(function (resolve, reject){
// 	let user = GetUser(1,());//takes 30sec
// 	if(user) resolve(user);
// 	else reject("user not found")
// })
//
// userPromise.then(user=>{
// 	console.log("user found",user)
// 	return user;
// }).then(user=>{
// 	let userCountry = GetCountry(user);
// 	return userCountry;
// }).then(userCountry=>{
// 	let userCity = GetCity(userCountry);
// 	return userCity;
// }).then(userCity => {
// 	console.log("all info found")
// })


