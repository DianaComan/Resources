import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import Profile from '../Components/Profile/Profile';
import Creaza from '../Components/Creaza/Creaza';
import Services from '../Components/Services/Services';
import {AdministrationPage} from "../Components/Administration/AdministrationPage";
import history from './history';

const Routes = props => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/signup">
                    <Signup/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/profile" render={(props) => <Profile {...props} />}/>
                <Route path="/creaza">
                    <Creaza/>
                </Route>
                <Route path="/services">
                    <Services/>
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;
