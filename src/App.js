import React from "react";
import UserPage from "./components/UserPage";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import {Box, Container} from "@mui/material"

export default class App extends React.Component{

  render(){

    return <Box>
              <Container>
                <Router>
                  <Routes>
                    <Route path="/user" element={<UserPage></UserPage>}></Route>
                    <Route path="/" element={
                      <>
                        <nav>
                          <ol>
                            <li>
                              <NavLink to="/user">Lista de Usuarios</NavLink> 
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
