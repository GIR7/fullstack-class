import {useState} from "react";

export const Button = ()=>{
	//Hooks—functions starting with `use`—can only be called at the top level of your components
	//can’t call Hooks inside conditions, loops, or other nested functions
	const [clicks,setClicks] = useState(0);
	
	return (
		<button
			onClick={()=>{setClicks(clicks+1)}}
		>
			Clicks: {clicks}
		</button>
	)
}
