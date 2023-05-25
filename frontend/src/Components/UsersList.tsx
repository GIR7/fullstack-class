import { useEffect, useState } from "react";
import axios from "axios";

//Get the user list from our backend:
// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage
export const UsersList =()=>{
	const [users,setUsers] = useState([])
	
	//takes a function(itself CANT be async) as a pram, which gets runs at the specific time
	useEffect(()=>{
		//make this function async, then immediately call this function
		const getUsers = async ()=>{
			//only fetches this ONCE, by using this empty depdence: []
			//if we have[users], means everytime users changes, re run this function
			const res = await axios.get("http://localhost:8080/users")
			console.log(res.data)
			return res.data;
			// setUsers(res.data);
		}
		// getUsers()
		getUsers().then(setUsers);//takes getUsers return and setusers
		
	},[])
	
	//if we change sth, react just re-render this
	return (
		<div>
			<h2>Users:</h2>
			{//{} for js.
				//if user is empty, don't render
				 users ?
					<ul>
						{
							//map js to html
							//extracting email and name
							users.map((user:{email:string,name:string}) =>
								//list item, key is unique
								<li key={user.email}>
									{" "}
									{user.name} - {user.email}{" "}
								</li>
							)
						}
					</ul>
					:
					null//just stop render
			}
		</div>
	)
}
