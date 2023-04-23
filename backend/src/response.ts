//Week2 Wed, 2nd part:

//could adding new features, or overwrite the old one

export function addsOnResponse(res){
	//overwrite the new one
	function end(content){
		res.setHeader("Content-Length", content.length);
		res.status();
		//this actually sends the response
		res.end(content);//this is calling the old version end
		return res;
	}
	//if passed in code is not valid, just get to set it was before
	res.status = (code) => {
		res.statusCode = code || res.statusCode;
		return res;
	};
	//sending str data
	res.send = (content) => {
		res.setHeader("Content-Type", "text/html");
		return end(content);
	};
	//sending js obj data
	res.json = (content) => {
		content = JSON.stringify(content);
		res.setHeader("Content-Type", "application/json");
		return end(content);
	};
	//takes you from old location to a new location
	res.redirect = (url) => {
		res.setHeader("Location", url);
		res.status(301);
		res.end();
		return res;
	};
}
