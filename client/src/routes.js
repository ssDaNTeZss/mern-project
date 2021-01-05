import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from "./pages/HomePage";
import {PersonalDataPage} from "./pages/PersonalDataPage";
import {AuthPage} from "./pages/AuthPage";
import {RegPage} from "./pages/RegPage";
import {ActivatePage} from "./pages/ActivatePage";
import {AdminHomePage} from "./pages/adminPages/AdminHomePage";
import {CreateStatementPage} from "./pages/CreateStatementPage";
import {useHttp} from "./hooks/http.hook";
import {DirectionsPage} from "./pages/adminPages/DirectionsPage";
import {CreateDirectionsPage} from "./pages/adminPages/CreateDirectionPage";

export const useRoutes = (isAuthenticated, role) => {
    if (isAuthenticated) {
        if (role === 'user') {
            return (
                <Switch>
                    <Route path="/statements" exact>
                        <HomePage/>
                    </Route>
                    <Route path="/personal-data" exact>
                        <PersonalDataPage/>
                    </Route>
                    <Route path="/create-statement" exact>
                        <CreateStatementPage/>
                    </Route>


                    <Redirect to="/statements"/>
                </Switch>
            );
        }

        if (role === 'admin') {
            return (
                <Switch>
                    <Route path="/home" exact>
                        <AdminHomePage/>
                    </Route>
                    <Route path="/directions" exact>
                        <DirectionsPage/>
                    </Route>
                    <Route path="/create-direction" exact>
                        <CreateDirectionsPage/>
                    </Route>

                    <Redirect to="/home"/>
                </Switch>
            );
        }
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