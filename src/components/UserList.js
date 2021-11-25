import React from "react"
import UserItem from "./UserItem"
import { Table, TableRow, TableHead, TableBody, TableCell} from "@mui/material"


export default class UserList extends React.Component{

    

    render(){
        if (this.props.list.length === 0) {
            return <h2>Lista vazia</h2>
        }

        let listaUsuario = this.props.list.map(item => {
           return <UserItem user={item} key={item._id} delete={()=>{this.props.delete(item._id)}} edit={(user)=>{this.props.putRequest(item._id, user)}}></UserItem> 
            
        })


        return  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Senha</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {listaUsuario}
                    </TableBody>                                            
                </Table>
    }

}