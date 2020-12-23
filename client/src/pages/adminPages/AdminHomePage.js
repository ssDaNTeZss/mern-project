import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from 'react-router-dom'
import {AdminNavbar} from "../../components/AdminNavbar";

export const AdminHomePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <div className="row">
            <div className="col"><AdminNavbar/></div>
            <div className="row app-main valign-wrapper">
                <div className="col s10">
                    <h4>Админка Система электронной подачи документов</h4>
                </div>
                <div className="col s2 right-align">
                    <a href="/" onClick={logoutHandler}>
                        <i className="small material-icons" style={{marginTop: 24}}>exit_to_app</i>
                    </a>
                </div>
            </div>
        </div>
    )
};