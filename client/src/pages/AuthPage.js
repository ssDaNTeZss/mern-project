import React, {useEffect, useState} from 'react';
import logo from '../images/IMG_1737.jpg'
import {useHttp} from "../hooks/http.hook";
import {NavLink} from "react-router-dom";

export const AuthPage = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {

    }, [error]);

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value });
    };

    const registrationHandler = async () => {
        try {
            const data = await request(
                '/api/auth/registration',
                'POST',
                {...form});
            console.log('Data', data);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s12 m6 offset-m3">
                <div className="card" style={{marginTop: 100}}>
                    <div className="card-image">
                        <img src={logo}/>
                            <span className="card-title">
                                <h3>Авторизация</h3>
                            </span>
                    </div>
                    <div className="card-content">
                        <div className="input-field">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="red-input"
                                onChange={changeHandler} />
                                <label htmlFor="password">Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="red-input"
                                onChange={changeHandler} />
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn red"
                            style={{marginRight: 24}}
                            disabled={loading}>
                            Войти
                        </button>
                        <button
                            className="btn white red-text text-accent-2 z-depth-0"
                            disabled={loading} >
                            <NavLink to="/registration"
                            className="red-text text-accent-2">
                            Регистрация
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};