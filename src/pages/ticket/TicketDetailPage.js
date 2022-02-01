import React, {Component} from 'react';
import '../../styles/Table.css';
import '../../styles/Detail.css';
import {getTicketDetailUrl, removeCourseUrl, removeTicketUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class TicketDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketData: [],
            loading: true,
            ticketType: {},
            account: {}
        };
    }

    componentDidMount() {
        console.log("ID: " + this.props.match.params.id)

        fetch(getTicketDetailUrl + this.props.match.params.id, {
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
                this.setState({
                    ticketData: jsonResponse, loading: false,
                    ticketType: jsonResponse.ticketType, account: jsonResponse.account
                })
            }).catch((err) => console.error(err));
    }

    handleDelete = (event) => {
        fetch(removeTicketUrl + this.props.match.params.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then(function (response) {
                if(response.ok) {
                    alert("Rezervace byla úspěšně zrušena");
                    window.location = '/ticket';
                } else {
                    alert("Rezervaci se nepodařilo zrušit");
                }
            }).then((text) => {
        }).catch((err) => console.error(err));

    }

    render() {
        const {ticketData, ticketType, account} = this.state;
    
        return (
            <div className="container text-center">
                <h2>Detail Rezervace </h2>
                <div className="align-items-center">
                    <div className="panel panel-info align-items-center text-center">
                        <table className="table table-user-information">
                            <tbody>
                            <tr>
                                <td><b>Sport:</b></td>
                                <td>{ticketData.sport}</td>

                            </tr>
                            <tr>
                                <td><b>Druh:</b></td>
                                <td>{ticketType.name}</td>
                            </tr>
                            <tr>
                                <td><b>Klient:</b></td>
                                <td>{account.login}</td>
                            </tr>
                            <tr>
                                <td><b>Datum začátku:</b></td>
                                <td>{ticketData.beginDate}</td>
                            </tr>
                            <tr>
                                <td><b>Datum vypršení:</b></td>
                                <td>{ticketData.endDate}</td>
                            </tr>

                            <tr>
                                <td><b>Možnosti:</b></td>
                                <td><Link to={{
                                    pathname: '/ticket/update/' + ticketData.id,
                                    ticketData: ticketData
                                }} className="btn btn-secondary btn-space">Upravit</Link>
                                    <Button onClick={this.handleDelete}
                                            className="btn btn-danger btn-space">Smazat</Button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }
}

export default TicketDetailPage;
