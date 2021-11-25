import React from "react";
import UserForm from "./UserForm";
import { TableCell, TableRow, Button} from "@mui/material";

export default class UserItem extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isUpdate: false
        }
    }
    
    handleDelete = () =>{
        this.props.delete()
    }

    setUpdate = () =>{
        this.setState({
            isUpdate: !this.state.isUpdate
        })
    }

    confirm = (user) =>{
        this.props.edit(user)
        this.setUpdate()
    }

    render(){

        let form = this.state.isUpdate ? <TableRow>
                                            <TableCell colSpan="3" > 
                                                <UserForm nome={this.props.user.nome} nacionalidade={this.props.user.nacionalidade} action={this.confirm}></UserForm> 
                                            </TableCell>
                                        </TableRow>: null

        let buttomDelet = <Button type="button" variant="outlined" color="error" onClick={this.handleDelete}>Deletar</Button>
        let buttomEdit = <Button type="button" variant="outlined" onClick={this.setUpdate}>Editar</Button>
        let buttomContainer = <span>{buttomDelet} {buttomEdit}</span>

    
        return  <>
                    <TableRow >
                        <TableCell> {this.props.user.nome}</TableCell> 
                        <TableCell>{this.props.user.nacionalidade}</TableCell>
                        <TableCell> {buttomContainer}</TableCell> 
                    </TableRow>
                    {form}
                </>
    }
}