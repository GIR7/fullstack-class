import { useAuth } from "@/Services/Auth.tsx";
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";


export function Logout(){
    const  auth = useAuth();
    const navigate = useNavigate()

    //anytime is Logout is being called/rendered,  run processLogout function
    useEffect(()=>{
        async function processLogout(){
            if(auth){
                await auth.handleLogout();//clear token
                //send user back the home page
                navigate("/")
            }else {
                console.error("Authorization is missing somehow")
                navigate("/")
            }
        }
        //after we done processlogout and prints to user
        processLogout().then(()=>{
            console.log("Logout completed successfully")
        })
    });
}
