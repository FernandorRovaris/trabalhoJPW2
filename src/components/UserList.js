import React from "react"
import UserItem from "./UserItem"
import { Table, TableRow, TableHead, TableBody, TableCell, Button, Divider} from "@mui/material"


export default class UserList extends React.Component{

    

    render(){
        if (this.props.list.length === 0) {
            return <h2>Lista vazia</h2>
        }

        let listaUsuario = this.props.list.map(item => {
           return <UserItem user={item} key={item._id} delete={()=>{this.props.delete(item._id)}} edit={()=>{this.props.atualizaUser(item)}}></UserItem>            
        })

        return  <section>
                    
                    <div style={{display:"inline-flex"}}>
                    <h2>Listagem de Usuarios</h2>
                    
                    <Button type="button" variant="outlined" style={{marginLeft:"50px"}} color="success" onClick={() =>{this.props.atualizaUser(null)}}>Cadastrar</Button>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Idade</TableCell>
                                <TableCell>Nascionalidade</TableCell>
                                <TableCell>Sexo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {listaUsuario}
                        </TableBody>                                            
                    </Table>
                </section>
    }

}