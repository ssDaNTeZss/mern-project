import React, {useContext, useEffect, useState} from 'react';
import logo from '../images/IMG_1737.jpg'
import {Formik} from "formik";
import {NavLink, useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

import jwt from 'jsonwebtoken';

export const ActivatePage = ({ match }) => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {error, request, clearError} = useHttp();

    let token = useParams().token;
    let { firstName } = jwt.decode(token);

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const activateHandler = async () => {
        try {
            const data = await request(
                '/api/auth/activation',
                'POST',
                {token});
        } catch (e) {}
    };

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: ''
                }}
                validateOnBlur
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card" style={{marginTop: 100}}>
                                <div className="card-image">
                                    <img src={logo}/>
                                    <span className="card-title">
                                <h3>Добро пожаловать, {firstName}</h3>
                            </span>
                                </div>
                                <div className="card-content center-align">
                                    <button
                                        className="btn red btn-large"
                                        onClick={activateHandler}
                                        type='submit'>
                                        Активируйте вашу учетную запись
                                    </button>
                                </div>
                                <div className="card-action center-align">
                                    <button
                                        className="btn white red-text text-accent-2 z-depth-0">
                                        <NavLink to="/"
                                                 className="red-text text-accent-2">
                                            Войти
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