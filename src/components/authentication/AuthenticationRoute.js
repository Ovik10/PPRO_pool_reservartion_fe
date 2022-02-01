import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../authentication/AuthenticationService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to={{pathname: '/login', message: 'K pokračování je nutné se přihlásit'}} />
        }

    }
}

export default AuthenticatedRoute
