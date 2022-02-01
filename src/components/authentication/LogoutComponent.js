import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

class LogoutComponent extends Component {
    render() {
        alert('Byl jste úspěšně odhlášen');
        return <Redirect to={{pathname: '/'}} />

    }
}
export default LogoutComponent
