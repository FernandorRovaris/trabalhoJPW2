import { Box } from "@mui/system";
import React from "react";
import PageRouter from "./components/Users/PageRouter";
import PageRouterPost from "./components/Posts/PageRouterPost";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Container } from "@mui/material";

export default class App extends React.Component{

  render(){

    return <Box>
    <Container>                
    <Router>
       <Routes>
         <Route path="/user" element={<PageRouter></PageRouter>}></Route>
         <Route path="/post/cadastro" element={<PageRouterPost></PageRouterPost>}></Route>
         <Route path="/" element={
           <>
             <nav>
               <ol>
                 <li>
                   <NavLink to="/user">Usuarios</NavLink> 
                 </li>
                 <li>
                   <NavLink to="/post/cadastro">Posts</NavLink>
                 </li>
               </ol>
             </nav>
           </>
         }></Route>
       </Routes>
     </Router>
   </Container>
 </Box> 
  }
}
