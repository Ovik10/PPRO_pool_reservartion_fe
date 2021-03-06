import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createAccountAdminUrl, createAccountUrl, getRolesUrl} from "../../constants";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            roles: [],
            role: '',
            isAdmin : false
        };
    }

    componentDidMount() {
        fetch(getRolesUrl, {
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
                this.setState({roles: jsonResponse})
                //console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if(roleName === 'Admin') {
            this.setState({isAdmin : true})
        } else {
            this.setState({isAdmin : false})
        }
    }

    handleChange = (event) => {
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });

        let json = JSON.stringify(object);

        const roleName = data.get("roleName");
        if(this.state.isAdmin) {
            fetch(createAccountAdminUrl + roleName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization': AuthenticationService.createBasicAuthToken
                    (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
                        sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("????et byl vytvo??en");
                } else {
                    alert("????et se nepoda??ilo vytvo??it");
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        } else {
            fetch(createAccountUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'authorization': AuthenticationService.createBasicAuthToken
                    (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
                        sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("????et byl vytvo??en");
                } else {
                    alert("????et se nepoda??ilo vytvo??it");
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        }
    }

    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jm??no</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="Va??e jm??no" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>P??ijmen??</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Va??e p??ijmen??" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control name="login" type="text" placeholder="V???? login" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Zadejte Va??e heslo" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Zadejte V???? email" required/>
                    <Form.Text className="text-muted">
                        V???? e-mail nikdy nebudeme sd??let s nik??m jin??m.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Telefonn?? ????slo</Form.Label>
                    <Form.Control name="phoneNumber" type="tel" placeholder="Zadejte Telefon?? ????slo" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required/>
                    <Form.Text className="text-muted">
                        Zadejte ve form??tu 000-000-000
                    </Form.Text>
                </Form.Group>

                {isAdmin &&  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="roleName" as="select" required>
                        {this.state.roles.map((role, index) => {
                            return (
                                <option key={index}>{role.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>}

                <Button variant="primary" type="submit">
                    Vytvo??it ????et
                </Button>
            </Form>

        )
    }
}

export default RegisterPage;
