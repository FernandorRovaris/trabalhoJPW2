import React from "react";
import {Box, Tab} from "@mui/material"
import UserCadForm from "./UserCadForm";
import Axios  from "axios";
import UserList from "./UserList";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserFilter from "./UserFiltro";

export default class PageRouter extends React.Component{
    constructor(props){
        super(props)
        this.API_URL = "http://localhost:3000/api/user"

        this.state = {
          userlist: [], 
          errorMessage: null,
          snack: false,
          user:{},
          tabIndex: "0"
      }
    }

    componentDidMount = () =>{
      this.updateUserList()
    }

    insertUser = async (user) =>{
        try{
            console.log(this.API_URL, user);
            let responce = await Axios.post(this.API_URL, user)
            console.log(responce);
            if (responce.status === 200) {
               this.updateUserList()
            }else{
                console.log("Algo deu Errado");
            }
           this.setState({
                errorMessage: null
            })          
        }catch(erro){
          this.setState({
              errorMessage: erro.message,
              snack: true
          })
        }
    }

    deleteUser = async (id) =>{
      try{
          let responce = await Axios.delete(`${this.API_URL}/${id}`)
          if (responce.status === 200) {
              this.updateUserList()
          }else{
              console.log("Algo deu Errado");
          }
          this.setState({
              errorMessage: null
          })
        
      }catch(erro){
        this.setState({
            errorMessage: erro.message
        })
      }
  }

  putUser = async (id, user) => {
    try{
        console.log(id, user);
        let responce = await Axios.put(`${this.API_URL}/${id}`, user)
        if (responce.status === 200) {
            this.updateUserList()
        }else{
            console.log("Algo deu Errado");
        }
        this.setState({
            errorMessage: null
        })
      
    }catch(erro){
      this.setState({
          errorMessage: erro.message
      })
    }
  }

  updateUserList = async () =>{
    let userlist = await this.getAllUser();
  }

  addFiltro = (filtro, valor) =>{
    if (valor) {
      if ((filtro === "?")) {
        filtro ="&"+ filtro
      }
      return filtro += "=" + valor   
    } else{  
      return ""
    }
  }

  getAllUser = async (filter) =>{

    this.setState({
      tabIndex: "0"
    })

    let filtro = ""
    if (filter) {      
      filtro = "?"
      filtro += this.addFiltro("nome", filter.nome)
      filtro += this.addFiltro("nacimento", filter.nacimento)
      filtro += this.addFiltro("nacionalidade", filter.nacionalidade)
      filtro += this.addFiltro("sexo", filter.sexo)
    }
    console.log(filtro);

    let users =  await Axios.get(this.API_URL + filtro)
    this.setState({
      userlist: users.data 
  })
               
  }

  InsertOrUpdade = (user)=>{
    
    console.log(user);
    if(user._id){

      this.putUser(user._id, user)
    } else{
      this.insertUser(user)
    }
  }

  setUser = (user)=>{
    this.setState({
      user,
      tabIndex: "1"
    })
    
  }

  render(){
    return  <TabContext value={this.state.tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList  onChange={(event,tabIndex)=>{this.setState({tabIndex})}} aria-label="basic tabs example">
                  <Tab label="Lista" value='0'/>
                  <Tab label="Cadastro" value="1"/>
                  <Tab label="Filtro" value="2"/>
                </TabList>
              </Box>
              <TabPanel value="0">
                <UserList list={this.state.userlist} delete={this.deleteUser} atualizaUser={this.setUser}></UserList>
              </TabPanel>
              <TabPanel value="1">
                <UserCadForm action={this.InsertOrUpdade} user={this.state.user}></UserCadForm>
              </TabPanel>
              <TabPanel value="2">
                 <UserFilter action={this.getAllUser} user={this.state.user}></UserFilter>
              </TabPanel>
            </TabContext>             
  }
}