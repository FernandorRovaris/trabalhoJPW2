import React from "react";
import {Button, TextField, Box} from "@mui/material"

export default class UserForm extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            nome: this.props.nome || "",
            nacionalidade: this.props.nacionalidade || ""
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        let user = {
            nome: this.state.nome,
            nacionalidade: this.state.nacionalidade
        }
        this.setState({
            nome: "",
            nacionalidade: ""
        })
        this.props.action(user)
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){   
        return  <form onSubmit={this.handleSubmit}>
                    <Box display="flex" flexDirection="column">
                    <TextField type="text" name="nome" label="Usuario" variant="standard" onChange={this.handleChange} value={this.state.nome}></TextField>
                    <TextField type="text" name="nacionalidade" label="Nascionalidade" variant="standard" onChange={this.handleChange} value={this.state.nacionalidade}></TextField>
                    <Button type="submit" name="confirm"> Confirmar</Button>
                    </Box>
                </form>
    }

}