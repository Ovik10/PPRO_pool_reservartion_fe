import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";

class CoursesDataTrainer extends Component {

    header = ["Název", "Od", "Do", "Počet konání", "Trenér", "Cena", "Kapacita"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableDataCourses() {
        return this.props.courses.map((course, index) => {
            const {id, name, beginDate, endDate, count, trainer, price, maxCapacity} = course;
            const newTo = {
                pathname: "/course/detail/" + id,
                courseName: name
            };
            return (
                <tr key={index}>
                    <td><Link to={newTo}>{name}</Link></td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{count}</td>
                    <td>{trainer.firstName} {trainer.lastName}</td>
                    <td>{price}</td>
                    <td>{maxCapacity}</td>
                </tr>
            )
        })
    }

    renderTableDataCoursesTrainer() {
        return this.props.coursesTrainer.map((course, index) => {
            const {id, name, beginDate, endDate, count, trainer, price, maxCapacity} = course;
            const newTo = {
                pathname: "/course/detail/" + id,
                courseName: name
            };
            return (
                <tr key={index}>
                    <td><Link to={newTo}>{name}</Link></td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{count}</td>
                    <td>{trainer.firstName} {trainer.lastName}</td>
                    <td>{price}</td>
                    <td>{maxCapacity}</td>
                </tr>
            )
        })
    }

    render() {
        let renderTable = false;
        if (this.props.coursesTrainer.length === 0) {
            renderTable = false;
        } else {
            renderTable = true;
        }

        console.log("Data: " + this.props.courses);
        if (this.props.courses.length === 0) {
            return <div>
                <Link to="/course/create" className="btn btn-primary">Vytvořit nový kurz</Link>
                <p className="text-danger">Nejsou vypsané žádné kurzy</p>
            </div>;
        } else {
            return (
                <div>
                    <h3>Vaše kurzy:</h3>
                    <Link to="/course/create" className="btn btn-primary">Vytvořit nový kurz</Link>
                    {renderTable &&
                    <div>
                        <table id='tables'>
                            <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableDataCoursesTrainer()}
                            </tbody>
                        </table>
                    </div>
                    }
                    <h3>Všechny kurzy:</h3>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableDataCourses()}
                        </tbody>
                    </table>
                </div>

            );
        }
    }
}

export default CoursesDataTrainer;
