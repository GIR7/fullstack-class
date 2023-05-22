import {useEffect, useState} from "react";
import initialState , {getRandomProfile} from "../initialState"
import {Profile} from './Profile.tsx'




export const Match= ()=>{
	let [currProfile, setProfile] = useState(initialState.currentProfile)
	let [likeHsty, setLikeHsty] = useState(initialState.likeHistory);
	
	
	const onLikeButtonClick=()=>{
		// this keeps allocations and copies to a minimum
		//?
		const newLikeHsty = [...likeHsty,currProfile]
		setLikeHsty(newLikeHsty)
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
		<Profile
			{...currProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
		/>
	
	
	return(
		<>
			<div>
				"MATCH PAGE"
		</div>
			{profile}
			</>
	)
}

