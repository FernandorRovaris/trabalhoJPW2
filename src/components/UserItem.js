import React from "react";
import { TableCell, TableRow, Button} from "@mui/material";
import moment, { now } from "moment";

export default class UserItem extends React.Component{

    constructor(props){
        super(props)
    }
    

    render(){

      

        let buttomDelet = <Button type="button" variant="outlined" color="error" onClick={ this.props.delete}>Deletar</Button>
        let buttomEdit = <Button type="button" variant="outlined" onClick={this.props.edit}>Editar</Button>
        let buttomContainer = <span>{buttomDelet} {buttomEdit}</span>

        const now = moment(new Date()); // Data de hoje
        const past = moment(this.props.user.nacimento); // Outra data no passado
        const duration = moment.duration(now.diff(past));

        

        return  <>
                    <TableRow >
                        <TableCell>{this.props.user.nome}</TableCell> 
                        <TableCell>{ Math.floor(duration.asYears()) }</TableCell>
                        <TableCell>{this.props.user.nacionalidade}</TableCell>
                        <TableCell>{this.props.user.sexo}</TableCell>
                        <TableCell>{buttomContainer}</TableCell> 
                    </TableRow>
                    
                </>
    }
}