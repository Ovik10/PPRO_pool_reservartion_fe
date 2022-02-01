import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {
    getAccountDetailUrl,
    getAllClients,
    getTicketTypes,
    updateCourseUrl, updateTicketUrl
} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PASSWORD
} from "../../components/authentication/AuthenticationService";

class UpdateTicketPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            accounts: [],
            ticketTypes: [],
            account:
                {
                    id: [],
                    firstName: [],
                    lastName: [],
                    login: [],
                    password: [],
                    email: [],
                    phoneNumber: [],
                    role: {id: [], name: [], accounts: []}

                },
            ticketType: {
                id: [],
                name: [],
                price: [],
                tickets: []
            },
            beginDate: [],
            endDate: [],
        }
    }

    componentDidMount() {

        const {ticketType, beginDate, endDate, account} = this.props.location.ticketData;
        console.log(this.props.location.ticketData);
        this.setState({
            ticketType: ticketType, account: account,
            beginDate: beginDate, endDate: endDate
        });

        fetch(getAllClients, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({accounts: jsonResponse})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        fetch(getTicketTypes, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ticketTypes: jsonResponse})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleChangeClientId = (event) => {

        fetch(getAccountDetailUrl + event.target.value, {
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
                this.setState({account: jsonResponse})
            }).catch((err) => console.error(err));
    }



    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.delete('accountId');
        data.delete('ticketTypeId');

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });

        object["account"] = this.state.account;
        object["ticketType"] = this.state.ticketType;
        let json = JSON.stringify(object);
        console.log(json);

        fetch(updateTicketUrl + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Rezervace byla upravena");
                window.location = '/ticket';
            } else {
                alert("Rezervaci se nepodařilo upravit");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <Form className="forms" onSubmit={this.handleSubmit}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Začátek platnosti</Form.Label>
                    <Form.Control defaultValue={this.state.beginDate} name="beginDate" type="datetime-local"
                                  placeholder="Datum a čas začátku platnosti rezervace"
                                  required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Konec platnosti</Form.Label>
                    <Form.Control defaultValue={this.state.endDate} name="endDate" type="datetime-local"
                                  placeholder="Datum a čas konce platnosti rezervace" onChange={this.handleChange}
                                  required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Výběr klienta</Form.Label>
                    <Form.Control value={this.state.account.id} name="accountId" as="select"
                                  onChange={this.handleChangeClientId} required>
                        {this.state.accounts.map((account, index) => {
                            return (
                                <option key={index} value={account.id}>{account.firstName} {account.lastName}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Výběr typu</Form.Label>
                    <Form.Control value={this.state.ticketType.id} name="ticketTypeId" as="select"
                                  onChange={this.handleChangeTicketTypeId} required>
                        {this.state.ticketTypes.map((type, index) => {
                            return (
                                <option key={index} value={type.id}>{type.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default UpdateTicketPage;
