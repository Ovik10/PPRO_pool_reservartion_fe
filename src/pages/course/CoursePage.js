import React, {Component} from 'react';
import CoursesData from "../../components/courses/CoursesData";
import Loader from 'react-loader-spinner'
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD, USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../../components/authentication/AuthenticationService";
import CoursesDataTrainer from "../../components/courses/CourseDataTrainer";
import {getCoursesUrl, getUserSignedCoursesUrl} from "../../constants";

class CoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesData: [],
            coursesDataTrainer : [],
            coursesDataUser : [],
            loading : true,
            isTrainer : false
        };
    }

    componentDidMount() {

        fetch(getCoursesUrl, {
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
                this.setState({coursesData: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        const userLogin = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

        fetch(getUserSignedCoursesUrl + userLogin, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({coursesDataUser: jsonResponse})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    render() {
        const { coursesData, loading, coursesDataUser } = this.state;
        let isTrainer = this.state.isTrainer;
        let coursesDataTrainer = [];
        let index = 0;
        for(let i = 0; i < coursesData.length; i++) {
            if(coursesData[i].trainer.login === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)) {
                coursesDataTrainer[index] = coursesData[i];
                index++;
            }
        }
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);

        if(roleName === 'Trainer') {
            isTrainer = true;
        } else {
            isTrainer = false;
        }
        console.log(coursesDataTrainer)
        console.log(isTrainer)
        return (
            <div className="tables">
                <h2>
                    Přehled kurzů
                </h2>

                {loading
                    ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>
                    : (isTrainer
                            ? <CoursesDataTrainer coursesTrainer={coursesDataTrainer} courses={coursesData}/>
                            : <CoursesData courses={coursesData} userCourses={coursesDataUser}/>
                    )
                }
            </div>
        );
    }
}

export default CoursePage;
