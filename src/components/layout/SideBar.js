import React, {Component} from 'react';
import '../../styles/NavigationBar.css'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from "../authentication/AuthenticationService";
import {Link} from "react-router-dom";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
       
    }

    render() {
        
        return (
            <div className="sidebar">
                <Link className="btn btn-outline-dark" to="/">Hlavní stránka</Link>
                <Link className="btn btn-outline-dark" to="/news">Aktuality</Link>
                <Link className="btn btn-outline-dark" to="/ticket">Rezervace</Link>
                <Link className="btn btn-outline-dark" to="/course">Kurzy/Akce</Link>
                <Link className="btn btn-outline-dark" to="/profile">Profil</Link>
                
            </div>
        );
    }
}

export default SideBar;
