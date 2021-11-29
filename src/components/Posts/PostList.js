import React from "react"
import { Table, TableRow, TableHead, TableBody, TableCell, Button, Divider} from "@mui/material"
import PostItem from "./PostItem"


export default class PostList extends React.Component{

    render(){
        if (this.props.list.length === 0) {
            return <h2>Lista vazia</h2>
        }

        let listaUsuario = this.props.list.map(item => {
           return <PostItem user={item} key={item._id} delete={()=>{this.props.delete(item._id)}} edit={()=>{this.props.atualizaUser(item)}}></PostItem>            
        })

        return  <section>
                    
                    <div style={{display:"inline-flex"}}>
                    <h2>Listagem de Posts</h2>
                    
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