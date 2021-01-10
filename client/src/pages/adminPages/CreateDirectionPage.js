import React, {useContext, useEffect, useState} from 'react';
import {AdminNavbar} from "../../components/AdminNavbar";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {Formik} from "formik";
import M from "materialize-css";
import * as yup from "yup";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const FORMOFEDUCATION = require('../../dataForSelect/formOfEducation');
const LEVELOFEDUCATION = require('../../dataForSelect/levelOfEducation');
const EXAMS = require('../../dataForSelect/listOfExams');

export const CreateDirectionsPage = () => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const [data, setData] = useState([]);
    const {loading, error, request, clearError} = useHttp();

    const [LOE, setLOE] = useState();
    const [FOE, setFOE] = useState();
    const [budget, setBudget] = useState(false);
    const [offBudget, setOffBudget] = useState(false);
    const [SOF, setSOF] = useState([]);
    const [DOS, setDOS] = useState();
    const [aB, setaB] = useState();
    const [aOB, setaOB] = useState();
    const [ex1, setEx1] = useState();

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

    const validationsSchema = yup.object().shape({
        directionOrSpecialty: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        levelOfEducation: yup.string()
            .required('Обязательное поле'),
        formOfEducation: yup.string()
            .required('Обязательное поле'),
        sourceOfFinancing: yup.string()
            .required('Обязательное поле'),
        amountBudget: yup.string()
            .matches(/^[1]$|^[1-9]{1}[0-9]{1}$|^100$/, 'Минимальное значение 1'),
        amountOffBudget: yup.string()
            .matches(/^[1]$|^[1-9]{1}[0-9]{1}$|^100$/, 'Минимальное значение 1'),
        exam1: yup.string()
            .required('Обязательное поле'),
        minScore1: yup.string()
            .matches(/^[1][0]$|^[1-9]{1}[0-9]{1}$|^100$/, 'Допустимое значение от 10 до 100')
            .required('Обязательное поле'),
        exam2: yup.string()
            .required('Обязательное поле'),
        minScore2: yup.string()
            .matches(/^[1][0]$|^[1-9]{1}[0-9]{1}$|^100$/, 'Допустимое значение от 10 до 100')
            .required('Обязательное поле'),
        exam3: yup.string()
            .required('Обязательное поле'),
        minScore3: yup.string()
            .matches(/^[1][0]$|^[1-9]{1}[0-9]{1}$|^100$/, 'Допустимое значение от 10 до 100')
            .required('Обязательное поле')
    });

    const setDirectionOrSpecialty = (e) => {
        setDOS(e.target.value);
    };

    const setAmountBudget = (e) => {
        setaB(e.target.value);
    };
    const setAmountOffBudget = (e) => {
        setaOB(e.target.value);
    };
    const setExam1 = (e) => {
        setEx1(e.target.value);
    };


    const setFormOfEducation = (e) => {
        setFOE(e.target.value);
    };

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
                        <input
                            name="formOfEducation1"
                            type="radio"
                            value={item.value}
                            onChange={setFormOfEducation}/>
                        <span>{item.label}</span>
                    </label>
                )
            }
        }, this);

    const setLevelOfEducation = (e) => {
        setLOE(e.target.value);
    };

    let levelOfEducationList = LEVELOFEDUCATION.length > 0
        && LEVELOFEDUCATION.map((item) => {
            if (item.value === data.levelOfEducation) {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="levelOfEducation1" type="radio" value={item.value} checked/>
                        <span>{item.label}</span>
                    </label>
                )
            } else {
                return (
                    <label style={{marginRight: 20}}>
                        <input name="levelOfEducation1" type="radio" value={item.value} onChange={setLevelOfEducation}/>
                        <span>{item.label}</span>
                    </label>
                )
            }
        }, this);

    let examList = EXAMS.length > 0
        && EXAMS.map((item) => {
            return (
                <option value={item.value} onChange={setExam1}>{item.label}</option>
            )
        }, this);

    const setSourceOfFinancing = (e) => {
        if (!budget) {
            setBudget(true);
        } else {
            setBudget(false);
        }
    };

    const setSourceOfFinancing2 = (e) => {
        if (!offBudget) {
            setOffBudget(true);
        } else {
            setOffBudget(false);
        }
    };

    const saveHandler = async (values) => {
        try {
            const data = await request(
                '/api/directions/data/save',
                'POST',
                values
            );
            message(data.message);
        } catch (e) {
        }
    };


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
                    <Formik initialValues={{
                        directionOrSpecialty: DOS || '',
                        levelOfEducation: LOE || '',
                        formOfEducation: FOE || '',
                        sourceOfFinancing: budget || offBudget || '',
                        amountBudget: aB || '',
                        amountOffBudget: aOB || '',
                        exam1: ex1 || '',
                        minScore1: '',
                        exam2: '',
                        minScore2: '',
                        exam3: '',
                        minScore3: '',
                        budgetFormik: budget || false,
                        offBudgetFormik: offBudget || false
                    }}
                            validationSchema={validationsSchema}
                            onSubmit={values => {
                                console.log(values);
                                // saveHandler(values);
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
                                                    <p>
                                                        <label htmlFor='levelOfEducation' style={{marginRight: 20}}>1.1
                                                            Уровень образования *</label>
                                                        {levelOfEducationList}
                                                    </p>
                                                    {touched.levelOfEducation && errors.levelOfEducation &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.levelOfEducation}</span>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <p>
                                                        <label htmlFor='formOfEducation' style={{marginRight: 20}}>1.2
                                                            Форма обучения *</label>
                                                        {formOfEducationList}
                                                    </p>
                                                    {touched.formOfEducation && errors.formOfEducation &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.formOfEducation}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s12">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='directionOrSpecialty'
                                                        onChange={handleChange}
                                                        onChange={setDirectionOrSpecialty}
                                                        onBlur={handleBlur}
                                                        value={values.directionOrSpecialty}
                                                    />
                                                    <label className="active" htmlFor='directionOrSpecialty'>1.3
                                                        Направление/Специальность *</label>
                                                    {touched.directionOrSpecialty && errors.directionOrSpecialty &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.directionOrSpecialty}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <p name='sourceOfFinancing'>
                                                        <label htmlFor='sourceOfFinancing' style={{marginRight: 20}}>1.4
                                                            Источник финансирования *</label>
                                                        <label style={{marginRight: 20}}>
                                                            <input
                                                                type="checkbox"
                                                                value='budget'
                                                                onChange={setSourceOfFinancing}/>
                                                            <span>Бюджет</span>
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value='offBudget'
                                                                onChange={setSourceOfFinancing2}/>
                                                            <span>Внебюджет</span>
                                                        </label>
                                                    </p>
                                                    {touched.sourceOfFinancing && errors.sourceOfFinancing &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.sourceOfFinancing}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='amountBudget'
                                                        onChange={handleChange}
                                                        onChange={setAmountBudget}
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
                                                        onChange={setAmountOffBudget}
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
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s4">
                                                    <select
                                                        name='exam1'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.exam1}
                                                    >
                                                        <option value="" disabled selected>Выберите экзамен</option>
                                                        {examList}
                                                    </select>
                                                    <label htmlFor='exam1'>1.7 Экзамен 1 *</label>
                                                    {touched.exam1 && errors.exam1 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.exam1}</span>}
                                                </div>
                                                <div className="input-field col s2">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='minScore1'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.minScore1}
                                                    />
                                                    <label className="active" htmlFor='minScore1'>1.7.1
                                                        Мин. балл 1 экзамена</label>
                                                    {touched.minScore1 && errors.minScore1 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.minScore1}</span>}
                                                </div>

                                                <div className="input-field col s4">
                                                    <select
                                                        name='exam2'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.exam2}
                                                    >
                                                        <option value="" disabled selected>Выберите экзамен</option>
                                                        {examList}
                                                    </select>
                                                    <label htmlFor='exam2'>1.8 Экзамен 2 *</label>
                                                    {touched.exam2 && errors.exam2 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.exam2}</span>}
                                                </div>
                                                <div className="input-field col s2">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='minScore2'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.minScore2}
                                                    />
                                                    <label className="active" htmlFor='minScore2'>1.8.1
                                                        Мин. балл 2 экзамена</label>
                                                    {touched.minScore2 && errors.minScore2 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.minScore2}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s4">
                                                    <select
                                                        name='exam3'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.exam3}
                                                    >
                                                        <option value="" disabled selected>Выберите экзамен</option>
                                                        {examList}
                                                    </select>
                                                    <label htmlFor='exam1'>1.9 Экзамен 3 *</label>
                                                    {touched.exam3 && errors.exam3 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.exam3}</span>}
                                                </div>
                                                <div className="input-field col s2">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='minScore3'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.minScore3}
                                                    />
                                                    <label className="active" htmlFor='minScore3'>1.9.1
                                                        Мин. балл 3 экзамена</label>
                                                    {touched.minScore3 && errors.minScore3 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.minScore3}</span>}
                                                </div>
                                            </div>

                                            <div className="row" style={{margin: 0}}>

                                                <button
                                                    disabled={!isValid && !dirty || loading}
                                                    className="btn red"
                                                    style={{marginRight: 24}}
                                                    onClick={handleSubmit}
                                                    type='submit'>
                                                    <i class="material-icons left">save</i>
                                                    Сохранить
                                                </button>

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