import {useEffect} from "react";

export type ProfileProps = {
	id: number;
	imgUri: string;
	name: string;
	onLikeButtonClick: () => void;
	onPassButtonClick: () => void;//takes in nothing and returns void
};

export function Profile(props:ProfileProps){
	//pulling the data off of the props
	//dont have to use all the data in type
	let {imgUri, name, onLikeButtonClick, onPassButtonClick} = props
	//give them in to html in return()
	
	useEffect(()=>{
		console.log("Profile re-rendered")
	})
	
	return (
		<div>
			<img src={imgUri} alt = "Profile of pet" />
			<h2>{name}</h2>
			<div>
				{" "}
				<button onClick={onPassButtonClick}> PASS </button>
				<button onClick={onLikeButtonClick}> LIKE </button>
			</div>{" "}
		</div>
	)
}
