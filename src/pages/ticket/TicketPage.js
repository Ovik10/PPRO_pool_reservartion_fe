import React, {Component} from 'react';
import TicketsData from '../../components/tickets/TicketsData';
import {getTicketsByAccountUrl, getTicketsUrl} from '../../constants';
import '../../styles/Table.css'
import Loader from "react-loader-spinner";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketsData: [],
            loading: true,
            isEmployee: false
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);

        if (roleName === 'Employee' || roleName === 'Admin') {
            this.setState({isEmployee: true})
        } else {
            this.setState({isEmployee: false})
        }

        if (roleName === 'Employee' || roleName === 'Admin') {
            fetch(getTicketsUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                        .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                        .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
                }
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    this.setState({ticketsData: jsonResponse, loading: false})
                    console.log("response: " + jsonResponse)
                }).catch((err) => console.error(err));
        } else {

            const userId = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ID);
            fetch(getTicketsByAccountUrl + userId + "/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                        .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                        .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
                }
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    this.setState({ticketsData: jsonResponse, loading: false})
                    console.log("response: " + jsonResponse)
                }).catch((err) => console.error(err));
        }
    }


    render() {
        const {ticketsData, loading} = this.state;
        return (
            <div className="tables">
               
                <div>
                    <h2>Přehled rezervací</h2>
                    <Link to="/ticket/create" className="btn btn-primary">Vytvořit novou rezervaci</Link>
                </div>
                
                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                    <TicketsData ticketsData={ticketsData}/>}
            </div>
        );
    }
}

export default TicketPage;
