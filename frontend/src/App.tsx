import { useState } from 'react'
import reactLogo from '@images/react.svg'
import viteLogo from '/vite.svg'
import '@css/App.css'
import {Home,Match,Button,UsersList} from "./Components";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";

export function App() {
 return (
   <BrowserRouter>
   <div className="App">
     <nav>
       <div className="menu">
         <Link to="/">Home</Link> ||
         <Link to="/match">Match</Link>
       </div>
     </nav>
     <UsersList/>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/match" element={<Match />} />
     </Routes>
   </div>
   </BrowserRouter>
 )
}

export default App
