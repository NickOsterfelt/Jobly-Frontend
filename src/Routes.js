import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import SignupForm from "./SignupForm";
import Profile from "./Profile";


function Routes({ loggedIn, handleLogout, handleLogin }) {

    function renderCompany(props) {
        return <Company {...props} />
    }
    
    function renderLogin(props) {
        return <Login {...props} handleLogin={handleLogin} />
    }

    function renderSignup(props) {
        return <SignupForm {...props} handleLogin={handleLogin} />
    }

    function renderProfileForm(props) {
        return <Profile {...props} />
    }

    function renderLogout() {
        handleLogout();
        return <Redirect to="/" />
    }

    if (loggedIn) {
        return (
            <Switch>
                <Route exact path="/"><Home loggedIn={loggedIn}/></Route>
                <Route exact path="/companies"><Companies /></Route>
                <Route exact path="/companies/:handle" render={renderCompany} />
                <Route exact path="/jobs"><Jobs /></Route>
                <Route exact path="/profile" render={renderProfileForm}/>
                <Route exact path="/logout" render={renderLogout} />
                <Redirect to="/" />
            </Switch>
        );
    }
    else {
        return (
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/login" render={renderLogin} />
                <Route exact path="/signup" render={renderSignup} />
                <Redirect to="/" />
            </Switch>
        );
    }


}

export default Routes;