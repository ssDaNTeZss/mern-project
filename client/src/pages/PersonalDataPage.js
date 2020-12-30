import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {NavLink, useHistory} from 'react-router-dom'
import M from 'materialize-css';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Formik} from "formik";
import * as yup from 'yup';
import {useMessage} from "../hooks/message.hook";

const CITIZENSHIP = require('../components/citizenship');

const genderOptions = [
    {value: 'male', label: 'Мужской'},
    {value: 'female', label: 'Женский'}
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

    useEffect(() => {
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
            .required('Обязательное поле'),
        BPL: yup.string()
            .typeError('Должно быть строкой')
            .required('Поле необходимо заполнить'),
        gender: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        citizenship: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        passportSeries: yup.string()
            .typeError('Должно быть строкой')
            .matches(/^[0-9]{4}$/, 'Должно быть 4 цифры')
            .required('Обязательное поле'),
        passportID: yup.string()
            .typeError('Должно быть числом')
            .matches(/^[0-9]{6}$/, 'Должно быть 6 цифр')
            .required('Обязательное поле'),
        passportIssued: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        departmentCode: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        dateOfIssue: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        region: yup.string()
            .typeError('Должно быть строкой'),
        point: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        district: yup.string()
            .typeError('Должно быть строкой'),
        street: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        house: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        apartment: yup.string()
            .typeError('Должно быть строкой'),
        phone: yup.string()
            .typeError('Должно быть строкой')
            .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'Формат номера')
            .required('Обязательное поле')

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

    console.log(data);

    let st = false;
    let genderList = genderOptions.length > 0
        && genderOptions.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    let citizenshipList = CITIZENSHIP.length > 0
        && CITIZENSHIP.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

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
                        gender: `${data.gender || ''}`,
                        citizenship: `${data.citizenship || ''}`,
                        citizenship2: `${data.citizenship2 || ''}`,
                        passportSeries: `${data.passportSeries || ''}`,
                        passportID: `${data.passportID || ''}`,
                        passportIssued: `${data.passportIssued || ''}`,
                        departmentCode: `${data.departmentCode || ''}`,
                        dateOfIssue: `${data.dateOfIssue || ''}`,
                        region: `${data.region || ''}`,
                        point: `${data.point || ''}`,
                        district: `${data.district || ''}`,
                        street: `${data.street || ''}`,
                        house: `${data.house || ''}`,
                        apartment: `${data.apartment || ''}`,
                        phone: `${data.phone || ''}`,
                        residenceAddress: `${data.residenceAddress || ''}`
                    }}
                            validationSchema={validationsSchema}
                            onSubmit={values => {
                                console.log(values);
                                saveHandler(values);
                            }}
                            enableReinitialize={true}
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
                                            <div className="row" style={{margin: 0}}>
                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s6">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='lastName'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.lastName}
                                                        />
                                                        <label className="active" htmlFor='lastName'>1.1 Фамилия
                                                            *</label>
                                                        {touched.lastName && errors.lastName &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.lastName}</span>}
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
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.firstName}</span>}
                                                    </div>
                                                </div>

                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s6">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='patronymic'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.patronymic}
                                                        />
                                                        <label className="active" htmlFor='patronymic'>1.3
                                                            Отчество</label>
                                                        {touched.patronymic && errors.patronymic &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.patronymic}</span>}
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
                                                        <label className="active" htmlFor='DOB'>1.4 Дата рождения
                                                            *</label>
                                                        {touched.DOB && errors.DOB &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.DOB}</span>}
                                                    </div>
                                                </div>

                                                <div className="row" style={{margin: 0}}>
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
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.BPL}</span>}
                                                    </div>
                                                    <div className="input-field col s4">
                                                        <select
                                                            name='gender'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.gender}
                                                        >
                                                            <option value="" disabled selected>Выберите пол</option>
                                                            {genderList}
                                                        </select>
                                                        <label htmlFor='gender'>1.6 Пол *</label>
                                                        {touched.gender && errors.gender &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.gender}</span>}
                                                    </div>
                                                </div>

                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s6">
                                                        <select
                                                            name="citizenship"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.citizenship}
                                                        >
                                                            <option value="" disabled selected>Выберите граждансво
                                                            </option>
                                                            {citizenshipList}
                                                        </select>
                                                        <label htmlFor='citizenship'>1.7 Гражданство *</label>
                                                        {touched.citizenship && errors.citizenship &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.citizenship}</span>}
                                                    </div>

                                                    <div className="input-field col s6">
                                                        <select
                                                            name="citizenship2"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.citizenship2}>
                                                            <option value="" disabled selected></option>
                                                            {citizenshipList}
                                                        </select>
                                                        <label htmlFor='citizenship2'>
                                                            1.8 Второе гражданство (при наличии двойного
                                                            гражданства)</label>
                                                        {touched.citizenship2 && errors.citizenship2 &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.citizenship2}</span>}
                                                    </div>
                                                </div>

                                                <div className="input-field col s3 offset-s9 right-align">
                                                    <button className="btn white red-text text-accent-2">
                                                        Добавить фото
                                                        <i className="material-icons right">add_a_photo</i>
                                                    </button>
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
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='passportSeries'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.passportSeries}
                                                        />
                                                        <label className="active" htmlFor='passportSeries'>2.1 Серия
                                                            паспорта *</label>
                                                        {touched.passportSeries && errors.passportSeries &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.passportSeries}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='passportID'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.passportID}
                                                        />
                                                        <label className="active" htmlFor='passportID'>2.2 Номер
                                                            паспорта
                                                            *</label>
                                                        {touched.passportID && errors.passportID &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.passportID}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='Date'
                                                            className='red-input'
                                                            name='dateOfIssue'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.dateOfIssue}
                                                        />
                                                        <label className="active" htmlFor='dateOfIssue'>2.3 Дата выдачи
                                                            *</label>
                                                        {touched.dateOfIssue && errors.dateOfIssue &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.dateOfIssue}</span>}
                                                    </div>
                                                </div>

                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s8">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='passportIssued'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.passportIssued}
                                                        />
                                                        <label className="active" htmlFor='passportIssued'>2.4 Паспорт
                                                            выдан
                                                            *</label>
                                                        {touched.passportIssued && errors.passportIssued &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.passportIssued}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='departmentCode'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.departmentCode}
                                                        />
                                                        <label className="active" htmlFor='departmentCode'>2.5 Код
                                                            подразделения *</label>
                                                        {touched.departmentCode && errors.departmentCode &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.departmentCode}</span>}
                                                    </div>
                                                </div>

                                                <div className="input-field col s4 offset-s8 right-align">
                                                    <button className="btn white red-text text-accent-2">
                                                        Добавить фото паспорта
                                                        <i className="material-icons right">add_a_photo</i>
                                                    </button>
                                                    <p className="red-text"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">location_on</i>
                                            Адрес прописки
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='region'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.region}
                                                        />
                                                        <label className="active" htmlFor='region'>3.1 Регион</label>
                                                        {touched.region && errors.region &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.region}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='point'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.point}
                                                        />
                                                        <label className="active" htmlFor='point'>3.2 Пункт *</label>
                                                        {touched.point && errors.point &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.point}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='district'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.district}
                                                        />
                                                        <label className="active" htmlFor='district'>3.3 Район</label>
                                                        {touched.district && errors.district &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.district}</span>}
                                                    </div>
                                                </div>

                                                <div className="row" style={{margin: 0}}>
                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='street'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.street}
                                                        />
                                                        <label className="active" htmlFor='street'>3.4 Улица *</label>
                                                        {touched.street && errors.street &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.street}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='house'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.house}
                                                        />
                                                        <label className="active" htmlFor='house'>3.5 Номер дома
                                                            *</label>
                                                        {touched.house && errors.house &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.house}</span>}
                                                    </div>

                                                    <div className="input-field col s4">
                                                        <input
                                                            type='text'
                                                            className='red-input'
                                                            name='apartment'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.apartment}
                                                        />
                                                        <label className="active" htmlFor='apartment'>3.6
                                                            Квартира</label>
                                                        {touched.apartment && errors.apartment &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.apartment}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">info</i>
                                            Контактная информация
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s8">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='residenceAddress'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.residenceAddress}
                                                    />
                                                    <label className="active" htmlFor='residenceAddress'>4.1 Адрес
                                                        фактического места проживания</label>
                                                    {touched.residenceAddress && errors.residenceAddress &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.residenceAddress}</span>}
                                                </div>

                                                <div className="input-field col s4">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='phone'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                    />
                                                    <label className="active" htmlFor='phone'>4.2 Телефон *</label>
                                                    {touched.phone && errors.phone &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.phone}</span>}
                                                </div>
                                            </div>
                                        </div>
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