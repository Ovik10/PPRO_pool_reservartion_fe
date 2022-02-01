import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import TicketPage from './pages/ticket/TicketPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileDetail from './pages/profile/ProfileDetail';
import CoursePage from './pages/course/CoursePage';
import {NoMatchPage} from './pages/NoMatchPage';
import './styles/App.css';
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import SideBar from "./components/layout/SideBar";
import CreateTicketPage from "./pages/ticket/CreateTicketPage";
import RegisterPage from './pages/auth/RegisterPage';
import AuthenticatedRoute from "./components/authentication/AuthenticationRoute";
import LoginPage from "./pages/auth/LoginPage";
import LogoutComponent from "./components/authentication/LogoutComponent";
import CreateCoursePage from "./pages/course/CreateCoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";
import ProfileUpdatePage from "./pages/profile/ProfileUpdatePage";
import AuthRouteTrainer from "./components/authentication/AuthRouteTrainer";
import NewsPage from "./pages/news/News";
import TicketDetailPage from "./pages/ticket/TicketDetailPage";
import UpdateTicketPage from "./pages/ticket/UpdateTicketPage";



class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <SideBar/>
                    <NavigationBar/>
                    <div className="Main-container">
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/account/create" component={RegisterPage}/>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/logout" exact component={LogoutComponent} />
                            <Route exact path="/course" component={CoursePage}/>
                            <Route exact path="/course/detail/:id" component={CourseDetailPage}/>
                            <AuthRouteTrainer exact path="/course/create" component={CreateCoursePage}/>
                            <AuthenticatedRoute exact path="/profile" component={ProfilePage}/>
                            <Route exact path="/profile/detail/:id" component={ProfileDetail}/>
                            <Route exact path="/profile/update/:id" component={ProfileUpdatePage}/>
                            <AuthenticatedRoute exact path="/ticket" component={TicketPage}/>
                            <AuthenticatedRoute exact path="/ticket/detail/:id" component={TicketDetailPage}/>
                            <AuthenticatedRoute exact path="/ticket/update/:id" component={UpdateTicketPage}/>
                            <AuthenticatedRoute path="/ticket/create" component={CreateTicketPage}/>
                            <Route path="/news" component={NewsPage}/>
                            <Route component={NoMatchPage}/>
                        </Switch>
                    </Layout>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
