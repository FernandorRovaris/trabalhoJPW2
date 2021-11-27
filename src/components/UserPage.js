import React from "react"
import UserList from "./UserList"
import  Axios from "axios"
import {Snackbar } from "@mui/material"


export default class UserPage extends React.Component{

    constructor(props){
        super(props)
        this.API_URL = "http://localhost:3000/api/user"
        
        this.state = {
            userlist: [], 
            errorMessage: null,
            snack: false
        }
    }

    componentDidMount = () =>{
        this.updateUserList()
    }

    updateUserList = async () =>{
        let userlist = await this.getAllUser();
        this.setState({
            userlist
        })
    }

    getAllUser = async () =>{
        let users =  await Axios.get(this.API_URL)
        return users.data            
    }

    insertUser = async (user) =>{
        try{
            console.log(user);
            let responce = await Axios.post(this.API_URL, user)
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

    openSnackbar = ()=>{
        this.setState({
            snack:  true
        })
    }

    closeSnackbar = ()=>{
        this.setState({
            snack:  false
        })
    }

    render(){
            return  <>  
                                                  
                        <section>
                            <h2>Listagem de Usuarios</h2>
                           <UserList list={this.state.userlist} delete={this.deleteUser} putRequest={this.putUser}></UserList>
                        </section>                 
                       <Snackbar
                        open={this.state.snack}
                        autoHideDuration={6000}
                        onClose={this.closeSnackbar}
                        message={this.state.errorMessage}
                       
                        />
                    </>
    }
}