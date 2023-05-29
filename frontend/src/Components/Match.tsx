// import { AuthContext } from "@/App.tsx";
import {useContext, useEffect, useState} from "react";
import initialState , {getRandomProfile} from "../initialState"
import {Profile} from './Profile.tsx'
import {useAuth} from '../Services/Auth.tsx'

//a match page container


export const Match= ()=>{
	
	//state applies for all the profiles in match page.
	//MUST lives in the parent component:Match
	let [currProfile, setProfile] = useState(initialState.currentProfile)
	
	//a listt of profiles that user liked
	let [likeHsty, setLikeHsty] = useState(initialState.likeHistory);
	
	//
	const auth = useAuth()
	// const token = useContext(AuthContext);
	
	const onLikeButtonClick=()=>{
		// this keeps allocations and copies to a minimum
		//?
		//takes old likeHsty, appending currProfile to it and store it as newHsty
		const newLikeHsty = [...likeHsty,currProfile]
		setLikeHsty(newLikeHsty)
		
		//after user clicks like, give a new profile
		const newProfile = getRandomProfile()
		setProfile(newProfile)
		
		console.log("Added new liked profile");
	}
	
	let onPassButtonClick = ()=>{
		const newCurrentProfile = getRandomProfile()
		setProfile(newCurrentProfile)
	}
	
	useEffect(()=>{
		console.log("-- Match re-renders --")
	})
	
	const profile =
		//passing a props into Profile component
		<Profile
			{...currProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
		/>
	
	console.log("auth:", auth);
	return(
		<>
			<div>"MATCH PAGE"</div>
			{/*<p> User logged in as {auth.token}</p>*/}{/*<p>User logged in as {auth && auth.token}</p>*/}{/*<p>User logged in as {auth && auth.token }</p>*/}
			{/*<p>User logged in as {auth && String(auth.token)}</p>*/}
			{/*^^^ Uncaught Error: Objects are not valid as a React child (found: object with keys {token}).
			 If you meant to render a collection of children, use an array instead.*/}
			
			
			
			<p>User logged in as {auth && auth.token && auth.token.token}</p>
			{profile}
		</>
	)
}

