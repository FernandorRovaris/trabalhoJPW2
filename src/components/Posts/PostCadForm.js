import React from "react";
import {Box, InputLabel, Button, Card, CardActions, CardContent, Container,  FormControl,  MenuItem, Select, TextField, Stack } from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@date-io/date-fns';


export default class PostCadForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            _id: null,
            nome: "",
            nacimento: null,
            sexo: "",
            nacionalidade: ""    
        }
    }

    componentDidMount(){
        let user = this.props.user        
        if(user){
            this.setState({
                _id: user._id,
                nome: user.nome,
                nacimento: user.nacimento,
                sexo: user.sexo,
                nacionalidade: user.nacionalidade
            })
        }      
    }

    handleChange = (event)=>{
        console.log(event);
       this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeData = (data)=>{
         console.log(data)
         this.setState({
            nacimento: data
        })
    }

    save = (event)=>{            
        let user = {
            _id: this.state._id,
            nome: this.state.nome,
            nacimento: this.state.nacimento,
            sexo: this.state.sexo,
            nacionalidade: this.state.nacionalidade  
        }

        console.log(user);

        this.props.action(user)

    }

    render(){

        return  <Box>
                    <Container>                        
                            <form onSubmit={this.save} >
                            <h1>Cadastro de Usuarios</h1>
                            <Card sx={{ maxWidth: 345 }} elevation={24}>
                                <CardContent display="flex"> 
                                    <Stack spacing={3}>
                                    
                                        <TextField required name="nome" label="Nome" variant="standard" value={this.state.nome} onChange={this.handleChange}></TextField>
                                    
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker label="Nascimento" value={this.state.nacimento} onChange={this.handleChangeData} renderInput={(params) => <TextField {...params} required variant="standard" />}/>
                                        </LocalizationProvider>

                                        <TextField name="nacionalidade" label="Nascionalidade" variant="standard" value={this.state.nacionalidade} onChange={this.handleChange}></TextField>
                                    
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="selector">Sexo</InputLabel>

                                            <Select name="sexo" required labelId="selector" value={this.state.sexo} onChange={this.handleChange}>
                                                <MenuItem value="Masculino">Masculino</MenuItem>
                                                <MenuItem value="Feminino">Feminino</MenuItem>
                                            </Select>    
                                        </FormControl>  

                                    </Stack>                              
                                </CardContent>
                                <CardActions>
                                    <Button>Cancelar</Button> 
                                    <Button type="submit" >Salvar</Button>                                
                                </CardActions>
                            </Card>
                       </form>
                    </Container>
                </Box>
    }

}