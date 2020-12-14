import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from "./pages/HomePage";
import {AuthPage} from "./pages/AuthPage";
import {RegPage} from "./pages/RegPage";
import {ActivatePage} from "./pages/ActivatePage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
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
            <Route path="/activate/:token" exact>
                <ActivatePage/>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
};