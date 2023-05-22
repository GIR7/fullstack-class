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
									{" "}
									{user.name} - {user.email}{" "}
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
