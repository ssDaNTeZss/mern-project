import React, {useContext, useEffect, useState} from 'react';
import {AdminNavbar} from "../../components/AdminNavbar";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {Formik} from "formik";
import M from "materialize-css";
import * as yup from "yup";

const FORMOFEDUCATION = require('../../dataForSelect/formOfEducation');
const LEVELOFEDUCATION = require('../../dataForSelect/levelOfEducation');

export const CreateDirectionsPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
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

    const validationsSchema = yup.object().shape({
        document: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле')
    });

    let formOfEducationList = FORMOFEDUCATION.length > 0
        && FORMOFEDUCATION.map((item) => {
            if (item.value === data.formOfEducation) {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="formOfEducation1" type="radio" value={item.value} checked/>
                        <span>{item.label}</span>
                    </label>
                )
            } else {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="formOfEducation1" type="radio" value={item.value}/>
                        <span>{item.label}</span>
                    </label>
                )
            }
        }, this);

    let levelOfEducationList = LEVELOFEDUCATION.length > 0
        && LEVELOFEDUCATION.map((item) => {
            if (item.value === data.levelOfEducation) {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="formOfEducation1" type="radio" value={item.value} checked/>
                        <span>{item.label}</span>
                    </label>
                )
            } else {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="formOfEducation1" type="radio" value={item.value}/>
                        <span>{item.label}</span>
                    </label>
                )
            }
        }, this);

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
                    <Formik initialValues={{}}
                            validationSchema={validationsSchema}
                            onSubmit={values => {
                                console.log(values);

                            }}
                            enableReinitialize={true}
                    >
                        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                            <div className="col s12">
                                <ul className="collapsible popout">
                                    <li className="active">
                                        <div className="collapsible-header">
                                            <i className="material-icons">add_box</i>
                                            <b>Создание направления</b>
                                        </div>
                                        <div className="collapsible-body">

                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='directionOrSpecialty'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.directionOrSpecialty}
                                                    />
                                                    <label className="active" htmlFor='directionOrSpecialty'>1.1
                                                        Направление/Специальность *</label>
                                                    {touched.directionOrSpecialty && errors.directionOrSpecialty &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.directionOrSpecialty}</span>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <p name='levelOfEducation'>
                                                        <label htmlFor='levelOfEducation' style={{marginRight: 20}}>1.2
                                                            Уровень образования *</label>
                                                        {levelOfEducationList}

                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <p name='formOfEducation'>
                                                        <label htmlFor='formOfEducation' style={{marginRight: 20}}>1.3
                                                            Форма обучения *</label>
                                                        {formOfEducationList}

                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <p name='levelOfEducation'>
                                                        <label htmlFor='levelOfEducation' style={{marginRight: 20}}>1.4
                                                            Источник финансирования</label>
                                                        <label style={{marginRight: 20}}>
                                                            <input type="checkbox" />
                                                            <span>Бюджет</span>
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" />
                                                            <span>Внебюджет</span>
                                                        </label>
                                                    </p>
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='amountBudget'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.amountBudget}
                                                    />
                                                    <label className="active" htmlFor='amountBudget'>1.5
                                                        Количество бюджетных мест</label>
                                                    {touched.amountBudget && errors.amountBudget &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.amountBudget}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='amountOffBudget'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.amountOffBudget}
                                                    />
                                                    <label className="active" htmlFor='amountOffBudget'>1.6
                                                        Количество внебюджетных мест</label>
                                                    {touched.amountOffBudget && errors.amountOffBudget &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.amountOffBudget}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
};