import React from "react";
import {Box, Tab} from "@mui/material"
import Axios  from "axios";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PostList from "./PostList";
import PostCadForm from "./PostCadForm";
import PostFilter from "./PostFiltro";

export default class PageRouterPost extends React.Component{
    constructor(props){
        super(props)
        this.API_URL = "http://localhost:3000/api/post/user"

        this.state = {
          postlist: [], 
          errorMessage: null,
          snack: false,
          post:{},
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
    console.log("Get Posts ");

    let users =  await Axios.get(this.API_URL + filtro)
    this.setState({
      postlist: users.data 
    })
      console.log(users.data);         
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
                <PostList list={this.state.postlist} delete={this.deleteUser} atualizaUser={this.setUser}></PostList>
              </TabPanel>
              <TabPanel value="1">
                <PostCadForm action={this.InsertOrUpdade} user={this.state.user}></PostCadForm>
              </TabPanel>
              <TabPanel value="2">
                 <PostFilter action={this.getAllUser} user={this.state.user}></PostFilter>
              </TabPanel>
            </TabContext>             
  }
}