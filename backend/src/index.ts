
//import * as dotdev from "dotenv";//not working
const dotdev = require("dotenv");
dotdev.config();

//import http from "http" //this would have err message:SyntaxError: Cannot use import statement outside a module
const http = require("http");



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
const server = http.createServer((req,res)=>{
	console.log("I got the request from a client..")
	//res: things you are sending back to client as a server
	res.writeHead(200,{"Content-Type":"text/html"})
	res.write("Hello World! I got your request, this is my response");
	res.end();
})

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


