import {createContext, useContext, useState} from "react";
import {httpClient} from "@/Services/HttpClient.tsx"
import { useNavigate } from "react-router-dom";

//Will put JWT token into this context later, for now is initialize null
export const AuthContext = createContext<AuthContextProps|null>(null)

//context :make some piece of data available everywhere in react that is below the component you are in
// will live in everything below the app component

export  type AuthContextProps = {
	token: string | null,
	//async function: tell us weather the login is successful or not
	handleLogin:(email:string,password:string)=> Promise<boolean>,
	//delete their token
	handleLogout: ()=>void
}

//when we have a token, we call this function to inject token into httpclient
const updateAxios = async (token:string) =>{
	//injecting sth(Auth) into request process
	httpClient.interceptors.request.use(
		async (config) => {
			// @ts-ignore
			config.headers = {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			};
			
			return config;
		},
		error =>{
			console.error("rejected token promise")
			Promise.reject(error)
		}
	)
}

//Check if token is already in local storage before we ask backend
const initialToken = getTokenFromStorage()
//if we have the initial token:
if (initialToken){
	// add token to http client
	await updateAxios(initialToken)
}

/**
 *
 * @param children - the ALL child components of current component
 * @constructor
 */
export const AuthProvider = ({children}:any) =>{
	const navigate = useNavigate()
	//token in react app itself
	//set token to whatever in the initial token
	const[token,setToken] = useState(initialToken)

	//if there is NOT a token in local storage, we need call this function
	const handleLogin = async (email:string,password:string) =>{
		console.log("In handlelogin with : ",email,password)
		//starts login flow: token verify
		try{
			//get the token from backend
			const thetoken = await getLoginTokenFromServer(email, password);
			//save the token into react and local storage
			saveToken(thetoken);
			//add token into http client
			await updateAxios(thetoken);
			//^ Hooray we're logged in and our token is saved everywhere!

			//send them back before they being direct to the login page
			navigate(-1);//-1:go backwards 1 step
			return true;
		} catch (err) {//if someone fails to login
	
			console.error("Failed to handle login: ", err);
			//send them to the login page again
			navigate("/login");
			return false;
		}
	}
	//helper func: save token into 2 places: react app & local storage
	const saveToken = (thetoken:string)=>{
		setToken(thetoken);
		localStorage.setItem("token",JSON.stringify(thetoken))

	}

	//delete token in both react app and local storage
	const handleLogout = () =>{
		setToken(null);
		localStorage.removeItem("token")
	}

	return(
		<AuthContext.Provider value={{
			token,
			handleLogin,
			handleLogout
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth =() =>{
	return useContext(AuthContext)
}


//get token from browser's local storage, or NULL
function getTokenFromStorage(){
	//if we have a key named token and returns a value
	const tokenString = localStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	//could be token or null
	return userToken?.token;
	
}

//A helper function that takes an email and password and then make the req to backend and then get the token from backend
export async function getLoginTokenFromServer(email,password){
	console.log("In get login token from server with ",email,password)
	
	
	console.log("before call the backend", httpClient.baseURL)//getting undefine
	//res is a token from backend
	let login_result = await httpClient.post("/login",{email,password})
	
	//returns the token
	return login_result.data;
}

export function getPayloadFromToken(token:string){
	const base64Url = token.split(".")[1]; // get the payload part of the token
	if(base64Url==null){
		console.log("Your token has no payload, what happens")
	}
	// Mostly ignore me, taken from JWT docs, this extracts the text payload from our token
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	//extract the text out of it
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	//parse it as object
	const payload = JSON.parse(jsonPayload);
	console.log(payload);
	return payload;
}
