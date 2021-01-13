import React, {useEffect, useState} from 'react';
import logo from '../images/IMG_1737.jpg'
import {Formik} from "formik";
import * as yup from 'yup';
import {NavLink} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const RegPage = () => {
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        lastName: '',
        firstName: '',
        patronymic: '',
        confirmPassword: '',
        email: ''
    });

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const registrationHandler = async (values) => {
        try {
            const data = await request(
                '/api/auth/register',
                'POST',
                values);
            message(data.message);
        } catch (e) {}
    };

    const validationsSchema = yup.object().shape({
        lastName: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить'),
        firstName: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить'),
        email: yup.string()
            .email('Введите верный email')
            .required('Поле необходимо заполнить'),
        password: yup.string()
            .typeError('Должно быть строкой')
            .min(8, "Пароль должен быть длиннее 8 символов")
            .required('Поле необходимо заполнить'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
            .required('Поле необходимо заполнить')
    });

    return (
        <div>
            <Formik
                initialValues={{
                    lastName: '',
                    firstName: '',
                    patronymic: '',
                    password: '',
                    confirmPassword: '',
                    email: ''
                }}
                validateOnBlur
                onSubmit={values => {
                    registrationHandler(values);
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
                                <h3>Регистрация</h3>
                            </span>
                                </div>
                                <div className="card-content">
                                    <div className="input-field">
                                        <input
                                            type='text'
                                            className='red-input'
                                            name='lastName'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}/>
                                        <label htmlFor='lastName'>Фамилия *</label>
                                        {touched.lastName && errors.lastName &&
                                        <p className="red-text">{errors.lastName}</p>}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type='text'
                                            className='red-input'
                                            name='firstName'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}/>
                                        <label htmlFor='firstName'>Имя *</label>
                                        {touched.firstName && errors.firstName &&
                                        <p className="red-text">{errors.firstName}</p>}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type='text'
                                            className='red-input'
                                            name='patronymic'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.patronymic}/>
                                        <label htmlFor='patronymic'>Отчество</label>
                                        {touched.patronymic && errors.patronymic &&
                                        <p className="red-text">{errors.patronymic}</p>}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type='email'
                                            className='red-input'
                                            name='email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}/>
                                        <label htmlFor='email'>Email *</label>
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
                                        <label htmlFor='password'>Пароль *</label>
                                        {touched.password && errors.password &&
                                        <p className="red-text">{errors.password}</p>}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type='password'
                                            className='red-input'
                                            name='confirmPassword'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}/>
                                        <label htmlFor='confirmPassword'>Пароль еще раз *</label>
                                        {touched.confirmPassword && errors.confirmPassword &&
                                        <p className="red-text">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                                <div className="card-action">
                                    <button
                                        disabled={!isValid && !dirty || loading}
                                        className="btn red"
                                        style={{marginRight: 24}}
                                        onClick={handleSubmit}
                                        type='submit'>
                                        Зарегистрироваться
                                    </button>
                                    <button
                                        className="btn white red-text text-accent-2 z-depth-0">
                                        <NavLink to="/"
                                                 className="red-text text-accent-2">
                                            Авторизация
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