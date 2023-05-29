import {useAuth} from './Services/Auth.tsx'
import { Home } from "@/Components/HomePage.tsx";
import { Match } from "@/Components/Match.tsx";
import {Login} from '@/Components/Login.tsx'
import {Logout} from '@/Components/Logout.tsx'
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute.tsx';
// import {UsersList} from "@/Components/UsersList.tsx"

//clean up routes in App.tsx
export function DoggrRouter(){
	//if this auth has a token in it, it means we logged in
	const auth = useAuth();
	
	//can only return ONE top level component (with its childs)
	return (
		<>
			<nav>
				<div className="menu">
					<Link to="/">Home</Link> ||
					<Link to="/match">Match</Link> ||
					
					{
						auth?.token != null
							?
							<Link to="/logout"> Logout </Link>
							:
							<Link to="/login"> Login </Link>
					}
					{/*<UsersList />*/}
				</div>
			</nav>
			
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</>
	)
}
