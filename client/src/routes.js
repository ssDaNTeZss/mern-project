import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from "./pages/HomePage";
import {AuthPage} from "./pages/AuthPage";
import {RegPage} from "./pages/RegPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <HomePage/>
                </Route>

                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route path="/registration" exact>
                <RegPage/>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
};