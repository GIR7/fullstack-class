import { Home } from "@/Components/HomePage.tsx";
import { Match } from "@/Components/Match.tsx";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import "@css/App.css";
import {UsersList} from "@/Components/UsersList.tsx"
import { AuthContext } from "./Services/Auth.tsx";
import { AuthProvider } from "./Services/Auth.tsx";


//this is our first react component
export function App() {
  
  //context :make some piece of data available everywhere in react that is below the component you are in
  // will live in everything below the app component
  
 return (
   <BrowserRouter>
     <AuthProvider  >
       <div className="App">
         <nav>
           <div className="menu">
             <Link to="/">Home</Link> ||
             <Link to="/match">Match</Link> ||
               <Link to="/login"> Login </Link>
             {/*<UsersList />*/}
           </div>
         </nav>
    
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/match" element={<Match />} />
             <Route path="/login" element={<Login />} />
         </Routes>
       </div>
    </AuthProvider>
   </BrowserRouter>
 )
}

export default App

/*
Goal :
-Creating a login page,takes a user email/password. sends them to the backend, and waits on a JWT response.

In communication between F and B, we don't using actually email and password retrieve from db, we just using the JWT token which contains thes information

-We will store the token in browser's local storage(key value pairs)
we will check if the token exists in local storage, we will get in into react app

- Be able to limit the pages that a user can navagate to based on weather if have the token or not,
- If a user tries to access some page that he doesn't have acecess to (because he's not logged in) we want to force him to the login page
- If we DO have a token, automatically supply it on all of our requests
Ensure that as much of this is automated as possible for frontend dev convinience
 */
