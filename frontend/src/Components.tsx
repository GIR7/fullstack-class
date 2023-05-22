import {useEffect, useState} from "react";
import axios from "axios";

// export const Header = ()=>{
// 	return (
// 		<div>
// 			<h1>Doggr</h1>
// 			<h3>Where your pets finds love(tm)</h3>
// 			<br/>
// 		</div>
// 	)
// }//move to Home

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


//Get the user list from our backend:
// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage
export const UsersList =()=>{
	const [users,setUsers] = useState([])
	
	useEffect(()=>{
		const getUsers = async ()=>{
			const res = await axios.get("http://localhost:8080/users")
			console.log(res.data)
			return res.data;
			// setUsers(res.data);
		}
		getUsers().then(setUsers);
		
	},[])
	
	return (
		<div>
			<h2>Users:</h2>
			{
				users ?
					<ul>
						{
							users.map((user:{email:string,name:string}) =>
								<li key={user.email}>
									{user.name} - {user.email}
								</li>
							)
						}
					</ul>
					:
					null
			}
		</div>
	)
}


export const Match = ()=>{
	return (
		<div>"MATCH PAGE"</div>
	)
}

export const Home = ()=>{
	return(
		<div>
			<Title />
			<Subtitle />
		</div>
	)
}
export function Title(){
	return (<h1>Doggr</h1>)
}
export function Subtitle(){
	return(<h3>Where your pets finds love(tm)</h3>)
}
