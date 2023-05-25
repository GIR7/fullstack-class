import {useState} from "react";

export const Button = ()=>{
	//Hooks—functions starting with `use`—can only be called at the TOP level of your components
	//CAN'T call Hooks inside conditions, loops, or other nested functions
	
	//setClick(arg): replace arg with whatever in clicks
	const [clicks,setClicks] = useState(0);
	
	return (
		<button
			onClick={()=>{setClicks(clicks+1)}}
		>
			Clicks: {clicks}
		</button>
	)
}
