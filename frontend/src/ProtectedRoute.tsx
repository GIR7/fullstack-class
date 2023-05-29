import { Navigate } from "react-router-dom";
import { useAuth } from "./Services/Auth.tsx"

export const ProtectedRoute  = ({children}) =>{
	const  {token} = useAuth();
	//we don't have a token, direct user to login page
	if(!token){
		return <Navigate to="/login"  replace />
	}
	return children;
}
