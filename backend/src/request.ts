//Week2 Wed, 2nd part:

import url from "url";

export function addsOnRequest(req){
	const parseUrl = url.parse(`${req.headers.host}${req.url}`,true)
	const keys = Object.keys(parseUrl)
	//grabing key fields(host, url) off of the url and attaching them on to the req
	keys.forEach((a_key)=>(req[a_key] = parseUrl[a_key]))
}
