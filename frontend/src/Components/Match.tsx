import {useContext, useEffect, useState} from "react";
import {Profile} from './Profile.tsx'
import {useAuth} from '../Services/Auth.tsx'
import {MatchService} from '../Services/MatchService.tsx'
import { ProfileType } from "@/DoggrTypes.ts";
import {getNextProfileFromServer} from '../Services/HttpClient.tsx'
import { PassService } from "@/Services/PassService.tsx";

//a match page container


export const Match= ()=>{
	
	//state applies for all the profiles in match page.
	//MUST lives in the parent component:Match
	const [currProfile, setProfile] = useState<ProfileType>()
	
	//a listt of profiles that user liked
	// let [likeHsty, setLikeHsty] = useState(initialState.likeHistory);
	
	//
	const auth = useAuth()
	// const token = useContext(AuthContext);
	
	//get the profile from backend and set it(triggers react to re render 'return') .
	const fetchProfile = () =>{
		getNextProfileFromServer()
			.then((res) => setProfile(res))
			.catch((e)=>console.error("Error in fetch profile", e))
	}
	
	//run this once at the beginning, to gets a profile
	useEffect(()=>{
		fetchProfile();
	},[])
	
	//when user clicks it, match those with ids, then gets a new profile
	const onLikeButtonClick=()=>{
		MatchService.send(auth.userId,currProfile.id)
			.then(fetchProfile)//after user clicks like, give a new profile
			.catch(err=>{
				console.error(err);
				fetchProfile();//still shows a new one even with small errors
			})
	}
	
	let onPassButtonClick = ()=>{
		PassService.send(auth.userId,currProfile.id)
			.then(fetchProfile)
			.catch(e=>{console.error(e);
				fetchProfile();
			})
	}
	
	
	
	const profile =
		//passing a props into Profile component
		//...means pass properties as separate props, such as name={currProfile.name}, age={currProfile.age}
		<Profile
			{...currProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
		/>
	
	console.log("auth:", auth);
	return(
		<>
			<div>"MATCH PAGE"</div>
			
			
			<p>User logged in as {auth.token}</p>
			{profile}
		</>
	)
}

