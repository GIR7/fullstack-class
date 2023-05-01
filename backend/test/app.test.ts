import 'chai/register-should.js';

import {test,teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from '../src/app.js';

teardown(()=>app.close());

test("requset the hello:,",async  ()=>{
	const res=await  app.inject({
		method:'GET',
		url:"/hello"
	});
	res.statusCode.should.equal(200);
	res.body.should.equal("Hilo");
	
});

test("list all user from /dbTest", async()=>{
	const res = await app.inject({
		method:"GET",
		url : "/dbTest"
	});
	res.statusCode.should.equals(200);
})

test("create a new user ", async ()=>{
	const payload = {
		name:"test name",
		email : faker.internet.email(),
		petType: "Dog"
	};
	
	const res = await app.inject({
		method:"POST",
		url:"/users",
		payload // sends our actual data
	});
	
	res.statusCode.should.equal(200);
	//the response we get back would have additional fields like "created_at","isMatch".
	res.payload.should.not.equal(payload);
	
	const resPayload = res.json();
	//what email we get back should be same with we send out
	resPayload.email.should.equal(payload.email);
	resPayload.petType.should.equal("Dog");
})

