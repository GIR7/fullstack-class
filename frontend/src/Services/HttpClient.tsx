import axios from "axios";

// const serverIP =import.meta.env.API_HOST;
// const serverPort = await import.meta.env.PORT;
// console.log("server port after awit import", serverPort)
// const serverUrl = `http://${serverIP}:${serverPort}`;
// console.log(serverUrl);//http://undefined:undefined

const serverUrl =`http://[::1]:8080`//this works
// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

