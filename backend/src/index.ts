//import * as dotdev from "dotenv";
//dotdev.config();
//import http from "http";


//js only runs on single thread
import * as console from "console";

console.log("hello");
console.log("world!");

//we can make our own threads in js
function GetUser(userId,callback){
	let foundUser = DelayedGet(userId) //pretend this takes 30sec
	//asyc func: wait 5 sec, then call the "callback()"
	setTimeout(()=>{
		callback(foundUser);
	},5000);
}

//callback:we can store any func into this "callback" parameter that we can use this func later on
//assign a func to anather var,not calling the func, just store it to a var
let Myvar = GetUser;



//"callback hell"
function GetalluserInfo(userId,callback){
	let user = GetUser("email.com",(user)=>{
		console.log("hi")
		if(user){
			GetuserCountry(user,(country)=>{
				if(country){
					GetuserState(country,(state)=>{
						if(state){
							Getusercity(state,(city)=>{
								if(city){
									console.log("We have all the info")
								}
							})
						}
					})
				}
			})
		}
	})
}

//promises: converting a callback to nicer form
//resolve : promise success, reject: failed
let userPromise = new Promise(function (resolve, reject){
	let user = GetUser(1,());//takes 30sec
	if(user) resolve(user);
	else reject("user not found")
})

userPromise.then(user=>{
	console.log("user found",user)
	return user;
}).then(user=>{
	let userCountry = GetCountry(user);
	return userCountry;
}).then(userCountry=>{
	let userCity = GetCity(userCountry);
	return userCity;
}).then(userCity => {
	console.log("all info found")
})
