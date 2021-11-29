import React from "react";
import {Box, InputLabel, Button, Card, CardActions, CardContent, Container,  FormControl,  MenuItem, Select, TextField, Stack } from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@date-io/date-fns';


export default class PostFilter extends React.Component{
    constructor(props){
        super(props)

        this.state = {            
            nome: "",
            nacimento: null,
            sexo: "",
            nacionalidade: ""    
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
        event.preventDefault();    
        let user = {
            _id: this.state._id,
            nome: this.state.nome,
            nacimento: this.state.nacimento,
            sexo: this.state.sexo,
            nacionalidade: this.state.nacionalidade  
        }
        this.props.action(user)
    }

    render(){
        return  <Box>
                    <Container>                        
                            <form onSubmit={this.save} >
                            <h1>Filtro de Usuarios</h1>
                            <Card sx={{ maxWidth: 345 }} elevation={24}>
                                <CardContent display="flex"> 
                                    <Stack spacing={3}>
                                    
                                        <TextField  name="nome" label="Nome" variant="standard" value={this.state.nome} onChange={this.handleChange}></TextField>
                                    
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DatePicker label="Nascimento" value={this.state.nacimento} onChange={this.handleChangeData} renderInput={(params) => <TextField {...params}  variant="standard" />}/>
                                        </LocalizationProvider>

                                        <TextField name="nacionalidade" label="Nascionalidade" variant="standard" value={this.state.nacionalidade} onChange={this.handleChange}></TextField>
                                    
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="selector">Sexo</InputLabel>

                                            <Select name="sexo"  labelId="selector" value={this.state.sexo} onChange={this.handleChange}>
                                                <MenuItem value="Masculino">Masculino</MenuItem>
                                                <MenuItem value="Feminino">Feminino</MenuItem>
                                            </Select>    
                                        </FormControl>  

                                    </Stack>                              
                                </CardContent>
                                <CardActions>                                   
                                    <Button type="submit" >Filtrar</Button>                                
                                </CardActions>
                            </Card>
                       </form>
                    </Container>
                </Box>
    }

}