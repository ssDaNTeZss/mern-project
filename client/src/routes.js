import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from "./pages/HomePage";
import {PersonalDataPage} from "./pages/PersonalDataPage";
import {AuthPage} from "./pages/AuthPage";
import {RegPage} from "./pages/RegPage";
import {ActivatePage} from "./pages/ActivatePage";
import {AdminHomePage} from "./pages/adminPages/AdminHomePage";

export const useRoutes = (isAuthenticated, role) => {
    console.log('isAuthenticated: ', isAuthenticated);
    console.log('Role: ', role);

    if (isAuthenticated ) {
        console.log('Authenticated');

            return (
                <Switch>
                    <Route path="/home" exact>
                        <HomePage/>
                    </Route>
                    <Route path="/personal-data" exact>
                        <PersonalDataPage/>
                    </Route>

                    <Redirect to="/home"/>
                </Switch>
            );


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

                <Redirect to="/"/>
            </Switch>
        )
};