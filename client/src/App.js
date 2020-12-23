import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";

function App() {
    const {token, login, logout, userId, userName, role} = useAuth();
    const isAuthenticated = !!token;
    // console.log('Role: ', role);
    const routes = useRoutes(isAuthenticated, role);
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated, userName, role
        }}>
            <Router>
                <div className="navigationPanel">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
