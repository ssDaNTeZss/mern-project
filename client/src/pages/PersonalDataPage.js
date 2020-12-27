import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {NavLink, useHistory} from 'react-router-dom'
import M from 'materialize-css';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Formik} from "formik";
import * as yup from 'yup';
import {useMessage} from "../hooks/message.hook";
import CustomSelect from "./CustomSelect";
const options = [
    {value: 'M', label: 'Мужской'}
];


export const PersonalDataPage = () => {
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

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);


    useEffect(() => {
        let elems = document.querySelectorAll('.collapsible', 'select');
        let instances = M.Collapsible.init(elems, {});

        let elems2 = document.querySelectorAll('select');
        let instances2 = M.FormSelect.init(elems2, {});
    });

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/userData/data`,
                'GET', null,
                {
                    userId
                }
            );
            setData(fetched);
            console.log(fetched.DOB);
        } catch (e) {
        }
    }, [userId, request]);

    useEffect(() => {
        getData();
    }, [getData]);

    const validationsSchema = yup.object().shape({
        lastName: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить'),
        firstName: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить'),
        patronymic: yup.string()
            .typeError('Должно быть строкой'),
        DOB: yup.date()
            .typeError('Должно быть датой')
            .required('Поле необходимо заполнить'),
        BPL: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить')
    });

    const saveHandler = async (values) => {
        try {
            const data = await request(
                '/api/userData/data/update',
                'PUT',
                values,
                {
                    userId
                }
            );
            message(data.message);
        } catch (e) {
        }
    };



    console.log(data.DOB);

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
                    <Formik initialValues={{
                        lastName: `${data.lastName || ''}`,
                        firstName: `${data.firstName || ''}`,
                        patronymic: `${data.patronymic || ''}`,
                        DOB: `${data.DOB || ''}`,
                        BPL: `${data.BPL || ''}`,
                        gender: ''
                    }}
                            validationSchema={validationsSchema}
                            enableReinitialize={true}
                            onSubmit={values => {
                                console.log(values);
                                saveHandler(values);
                            }}
                    >
                        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                            <div className="col s12">
                                <ul className="collapsible popout">
                                    <li className="active">
                                        <div className="collapsible-header">
                                            <i className="material-icons">person</i>
                                            Личные сведения
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='lastName'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastName}
                                                    />
                                                    <label className="active" htmlFor='lastName'>1.1 Фамилия *</label>
                                                    {touched.lastName && errors.lastName &&
                                                    <p className="red-text">{errors.lastName}</p>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='firstName'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.firstName}
                                                    />
                                                    <label className="active" htmlFor='firstName'>1.2 Имя *</label>
                                                    {touched.firstName && errors.firstName &&
                                                    <p className="red-text">{errors.firstName}</p>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='patronymic'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.patronymic}
                                                    />
                                                    <label className="active" htmlFor='patronymic'>1.3 Отчество</label>
                                                    {touched.patronymic && errors.patronymic &&
                                                    <p className="red-text">{errors.patronymic}</p>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <input
                                                        type='Date'
                                                        className='red-input'
                                                        name='DOB'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.DOB}
                                                    />
                                                    <label className="active" htmlFor='DOB'>1.4 Дата рождения *</label>
                                                    {touched.DOB && errors.DOB &&
                                                    <p className="red-text">{errors.DOB}</p>}
                                                </div>
                                                <div className="input-field col s8">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='BPL'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.BPL}
                                                    />
                                                    <label className="active" htmlFor='BPL'>1.5 Место рождения (по
                                                        паспорту) *</label>
                                                    {touched.BPL && errors.BPL &&
                                                    <p className="red-text">{errors.BPL}</p>}
                                                </div>
                                                <div className="input-field col s4">
                                                    <CustomSelect
                                                        options={options}
                                                        value={values.gender}
                                                        onChange={handleChange}
                                                        className={'browser-default'}
                                                        />
                                                    <label htmlFor='gender'>1.6 Пол *</label>
                                                    {touched.gender && errors.gender &&
                                                    <p className="red-text">{errors.gender}</p>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <select>
                                                        <option value="" disabled selected>Выберите граждансво</option>
                                                        <option value="1">Test 1</option>
                                                        <option value="2">Test 2</option>
                                                    </select>
                                                    <label>1.7 Гражданство *</label>
                                                    <p className="red-text"></p>
                                                </div>
                                                <div className="input-field col s6">
                                                    <select>
                                                        <option value="" disabled selected></option>
                                                        <option value="1">Test 1</option>
                                                        <option value="2">Test 2</option>
                                                    </select>
                                                    <label>1.8 Второе гражданство (при наличии двойного
                                                        гражданства)</label>
                                                    <p className="red-text"></p>
                                                </div>
                                                <div className="input-field col s4">
                                                    <button className="btn white red-text text-accent-2">
                                                        Добавить фото
                                                    </button>
                                                    <p className="red-text"></p>
                                                </div>
                                                <div className="input-field col s8">
                                                    <label>
                                                        <input type="checkbox" className="filled-in checkbox-orange"/>
                                                        <span>Согласен на обработку персональных данных *</span>
                                                    </label>
                                                    <p className="red-text"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">folder_shared</i>
                                            Документ удостоверяющий личность и гражданство
                                        </div>
                                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">location_on</i>
                                            Адрес
                                        </div>
                                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">info</i>
                                            Контактная информация
                                        </div>
                                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">people</i>
                                            Родственники и законные представители
                                        </div>
                                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                    </li>
                                </ul>
                                <button
                                    disabled={!isValid && !dirty || loading}
                                    className="btn red"
                                    style={{marginRight: 24}}
                                    onClick={handleSubmit}
                                    type='submit'>
                                    Сохранить
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>

        </div>
    );
};