import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {TableSt} from "../components/TableSt";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import M from "materialize-css";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

export const HomePage = () => {
    const history = useHistory();
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const auth = useContext(AuthContext);
    const {userId} = useContext(AuthContext);
    const [data, setData] = useState([]);

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

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/statement/getAll`,
                'GET', null,
                {
                    userId
                }
            );
            setData(fetched);
        } catch (e) {
        }
    }, [userId, request]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className="row">
            <div className="col"><Navbar/></div>
            <div className="col app-main valign-wrapper">
                <div className="row">
                    <div className="col s10">
                        <h4>Система электронной подачи документов</h4>
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
                                    <i className="material-icons">bookmark</i>
                                    <b>Мои заявления</b>
                                </div>
                                <div className="collapsible-body">

                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Уровень образования</th>
                                            <th>Форма обучения</th>
                                            <th>Источник финансирования</th>
                                            <th>Направление подготовки (специальность)</th>
                                            <th>Статус</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <TableSt arr={data} />
                                        </tbody>
                                    </table>
                                    <NavLink to="/create-statement" className="btn red navLinkBtn">
                                        Добавить заявление
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};