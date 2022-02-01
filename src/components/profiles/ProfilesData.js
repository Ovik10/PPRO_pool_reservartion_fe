import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";

class ProfilesData extends Component {

    header = ["Login", "Role", "Detail"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableData() {
        return this.props.profilesData.map((profile, index) => {
            const {id, login, role} = profile;
            const newTo = {
                pathname: "/profile/detail/" + id,
            };
            return (
                <tr key={index}>
                    <td>{login}</td>
                    <td>{role.name}</td>
                    <td><Link to={newTo}>{"zobrazit"}</Link></td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div>
                <table id='tables'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProfilesData;
