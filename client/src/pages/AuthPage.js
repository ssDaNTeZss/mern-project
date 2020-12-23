import React, {useContext, useEffect, useState} from 'react';
import logo from '../images/IMG_1737.jpg'
import {Formik} from "formik";
import * as yup from 'yup';
import {NavLink} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const loginHandler = async (values) => {
        try {
            const data = await request(
                '/api/auth/login',
                'POST',
                values);
            auth.login(data.token, data.userId, data.userName, data.role);
        } catch (e) {}
    };

    const validationsSchema = yup.object().shape({
        email: yup.string()
            .email('Введите верный email')
            .required('Поле необходимо заполнить'),
        password: yup.string()
            .typeError('Должно быть строкой')
            .min(8, "Пароль должен быть длиннее 8 символов")
            .required('Поле необходимо заполнить'),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: ''
                }}
                validateOnBlur
                onSubmit={values => {
                    loginHandler(values);
                }}
                validationSchema={validationsSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
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
                                            type='email'
                                            className='red-input'
                                            name='email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}/>
                                        <label htmlFor='email'>Email</label>
                                        {touched.email && errors.email &&
                                        <p className="red-text">{errors.email}</p>}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type='password'
                                            className='red-input'
                                            name='password'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}/>
                                        <label htmlFor='password'>Пароль</label>
                                        {touched.password && errors.password &&
                                        <p className="red-text">{errors.password}</p>}
                                    </div>
                                </div>
                                <div className="card-action">
                                    <button
                                        disabled={!isValid && !dirty || loading}
                                        className="btn red"
                                        style={{marginRight: 24}}
                                        onClick={handleSubmit}
                                        type='submit'>
                                        Войти
                                    </button>
                                    <button
                                        className="btn white red-text text-accent-2 z-depth-0">
                                        <NavLink to="/registration"
                                                 className="red-text text-accent-2">
                                            Регистрация
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};