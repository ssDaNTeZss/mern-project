import React, {useEffect, useState} from 'react';
import logo from '../images/IMG_1737.jpg'
import {useHttp} from "../hooks/http.hook";

export const RegPage = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

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
                                <h3>Регистрация</h3>
                            </span>
                    </div>
                    <div className="card-content">
                        <div className="input-field">
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                className="red-input"
                                onChange={changeHandler}/>
                            <label htmlFor="lastName">Фамилия</label>
                        </div>
                        <div className="input-field">
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                className="red-input"
                                onChange={changeHandler} />
                            <label htmlFor="firstName">Имя</label>
                        </div>
                        <div className="input-field">
                            <input
                                id="patronymic"
                                type="text"
                                name="patronymic"
                                className="red-input"
                                onChange={changeHandler} />
                            <label htmlFor="patronymic">Отчество</label>
                        </div>
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
                        <div className="input-field">
                            <input
                                id="passwordRepeated"
                                type="password"
                                name="passwordRepeated"
                                className="red-input"
                                onChange={changeHandler} />
                            <label htmlFor="passwordRepeated">Пароль еще раз</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn red"
                            style={{marginRight: 24}}
                            onClick={registrationHandler}
                            disabled={loading}>
                            Зарегистрироваться
                        </button>
                        <button
                            className="btn white red-text text-accent-2"
                            disabled={loading} >
                            Авторизация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};