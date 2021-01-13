import React, {useContext, useEffect, useState} from 'react';
import {AdminNavbar} from "../../components/AdminNavbar";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import M from "materialize-css";

export const DirectionsPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    useEffect(() => {
        let elems = document.querySelectorAll('.collapsible', 'select');
        let instances = M.Collapsible.init(elems, {});

        let elems2 = document.querySelectorAll('select');
        let instances2 = M.FormSelect.init(elems2, {});
    });

    return (
        <div className="row">
            <div className="col"><AdminNavbar/></div>
            <div className="col app-main valign-wrapper">
                <div className="row">
                    <div className="col s10">
                        <h4>Админка Система электронной подачи документов</h4>
                    </div>
                    <div className="col s2 right-align">
                        <a href="/" onClick={logoutHandler}>
                            <i className="small material-icons" style={{marginTop: 24}}>exit_to_app</i>
                        </a>
                    </div>

                    <div className="col s12">
                        <ul className="collapsible popout">
                            <li className="active">
                                <div className="collapsible-header">
                                    <i className="material-icons">collections_bookmark</i>
                                    <b>Список направлений</b>
                                </div>
                                <div className="collapsible-body">
                                    <NavLink to="/create-direction" className="btn red navLinkBtnTop">
                                        Добавить напревление
                                    </NavLink>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Рег. номер</th>
                                            <th>Уровень образования</th>
                                            <th>Форма обучения</th>
                                            <th>Форма обучения</th>
                                            <th>Направление подготовки (специальность)</th>
                                            <th>Статус</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};