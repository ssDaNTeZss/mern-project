import React, {useContext, useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {FieldArray, Formik} from "formik";
import M from "materialize-css";
import * as yup from "yup";
import {useHttp} from "../hooks/http.hook";

const EDUCATION = require('../dataForSelect/educationalInstitution');
const ACHIEVEMENTS = require('../dataForSelect/individualAchievements');


export const CreateStatementPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();

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
            .required('Обязательное поле'),
        series: yup.string()
            .typeError('Должно быть строкой')
            .matches(/^[0-9]{5}$/, 'Должно быть 5 цифр'),
        documentNumber: yup.string()
            .typeError('Должно быть строкой')
            .matches(/^[0-9]{7,14}$/, 'Должно быть от 7 до 14 цифр')
            .required('Обязательное поле'),
        nameEI: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        dateOfIssue: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        educationalInstitution: yup.string()
            .typeError('Должно быть строкой')
            .required('Обязательное поле'),
        yearOfEnding: yup.string()
            .typeError('Должно быть строкой')
            .matches(/^[0-9]{4}$/, 'Должно быть 4 цифры')
            .required('Обязательное поле'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 10 МБ', (value) => {
                if (!value) return false;
                return value.size < 10485760
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg', 'image/pjpeg', 'application/pdf'], 'Добавьте файл с правильным форматом').required('Добавьте файл с правильным форматом'),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required('Обязательное поле'),
        file2: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 10 МБ', (value) => {
                if (!value) return false;
                return value.size < 10485760
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg', 'image/pjpeg', 'application/pdf'], 'Добавьте файл с правильным форматом').required('Добавьте файл с правильным форматом'),
            name: yup.string().required()
        }).typeError('Добавьте файл'))
    });

    const documentOptions = [
        {value: 'certificate', label: 'Аттестат'},
        {value: 'diploma', label: 'Диплом'}
    ];

    let documentList = documentOptions.length > 0
        && documentOptions.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    let educationList = EDUCATION.length > 0
        && EDUCATION.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    let achievementsList = ACHIEVEMENTS.length > 0
        && ACHIEVEMENTS.map((item) => {
            return (
                <div className="col s4">
                    <label>
                        <input type="checkbox" value={item.value} name="achievements"/>
                        <span>{item.label}</span>
                    </label>
                </div>
            )
        }, this);

    // useEffect(() => {
    //     if (value.document === 'certificate') {
    //         console.log('Аттестат');
    //     }
    // }, [values]);

    const getFileSchema = (file) => file && ({
        file: file,
        type: file.type,
        name: file.name
    });

    const getError = (touched, error) => {
        return touched && error && <span className="helper-text red-text" data-error="wrong"
                                         data-success="right">{error}</span>
    };

    const getArrErrorsMessages = (errors) => {
        const result = [];
        errors && Array.isArray(errors) && errors.forEach((value) => {
            if (typeof value === 'string') {
                result.push(value)
            } else {
                Object.values(value).forEach((error) => {
                    result.push(error)
                })
            }
        });
        return result
    };


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
                        document: '',
                        series: '',
                        documentNumber: '',
                        dateOfIssue: '',
                        educationalInstitution: '',
                        nameEI: '',
                        yearOfEnding: '',
                        file: undefined,
                        file2: undefined

                    }}
                            validationSchema={validationsSchema}
                            onSubmit={values => {
                                console.log(values);
                                console.log('qwe');
                            }}
                            enableReinitialize={true}
                    >
                        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                            <div className="col s12">
                                <ul className="collapsible popout">
                                    <li className="active">
                                        <div className="collapsible-header">
                                            <i className="material-icons">book</i>
                                            <b>Образование</b>
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s3">
                                                    <select
                                                        name='document'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.document}
                                                    >
                                                        <option value="" disabled selected>Выберите документ об
                                                            образовании
                                                        </option>
                                                        {documentList}
                                                    </select>
                                                    <label htmlFor='document'>1.1 Документ об
                                                        образовании *</label>
                                                    {touched.document && errors.document &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.document}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='series'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.series}
                                                    />
                                                    <label className="active" htmlFor='series'>1.2 Серия (у аттестата
                                                        все цифры пишем в номер)</label>
                                                    {touched.series && errors.series &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.series}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='documentNumber'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.documentNumber}
                                                    />
                                                    <label className="active" htmlFor='documentNumber'>1.3 Номер
                                                        документа *</label>
                                                    {touched.documentNumber && errors.documentNumber &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.documentNumber}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='Date'
                                                        className='red-input'
                                                        name='dateOfIssue'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.dateOfIssue}
                                                    />
                                                    <label className="active" htmlFor='dateOfIssue'>1.4
                                                        Дата выдачи *</label>
                                                    {touched.dateOfIssue && errors.dateOfIssue &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.dateOfIssue}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s3">
                                                    <select
                                                        name='educationalInstitution'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.educationalInstitution}
                                                    >
                                                        <option value="" disabled selected>Выберите учебное заведение
                                                        </option>
                                                        {educationList}
                                                    </select>
                                                    <label htmlFor='educationalInstitution'>1.5 Учебное заведение
                                                        *</label>
                                                    {touched.educationalInstitution && errors.educationalInstitution &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.educationalInstitution}</span>}
                                                </div>
                                                <div className="input-field col s6">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='nameEI'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.nameEI}
                                                    />
                                                    <label className="active" htmlFor='nameEI'>1.6 Наименование учебного
                                                        заведения (как в Документе об образовании) *</label>
                                                    {touched.nameEI && errors.nameEI &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.nameEI}</span>}
                                                </div>
                                                <div className="input-field col s3">
                                                    <input
                                                        type='text'
                                                        className='red-input'
                                                        name='yearOfEnding'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.yearOfEnding}
                                                    />
                                                    <label className="active" htmlFor='yearOfEnding'>1.7
                                                        Год окончания *</label>
                                                    {touched.yearOfEnding && errors.yearOfEnding &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.yearOfEnding}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="file-field input-field">
                                                    <div className="btn white red-text text-accent-2">
                                                        <i className="material-icons right">scanner</i>
                                                        <span>Добавить скан документа об образовании</span>
                                                        <FieldArray name='file'>
                                                            {(arrayHelper) => (
                                                                <input type="file"
                                                                       name='file'
                                                                       onChange={event => {
                                                                           const {files} = event.target;
                                                                           const file = getFileSchema(files.item(0));
                                                                           if (!file) {
                                                                               arrayHelper.remove(0);
                                                                           }
                                                                           if (Array.isArray(values.file)) {
                                                                               arrayHelper.replace(0, file);
                                                                           } else {
                                                                               arrayHelper.push(file);
                                                                           }
                                                                       }}
                                                                       onBlur={handleBlur}/>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input
                                                            className="file-path validate"
                                                            type="text"
                                                            placeholder="Загрузите один файл"/>
                                                    </div>
                                                    {getArrErrorsMessages(errors.file).map((error) => getError(true, error))}
                                                    {touched.file && errors.file &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.file}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">grade</i>
                                            <b>Индивидуальные достижения</b>
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                {achievementsList}
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="file-field input-field">
                                                    <div className="btn white red-text text-accent-2">
                                                        <i className="material-icons right">scanner</i>
                                                        <span>Добавить скан документа об образовании</span>
                                                        <FieldArray name='file2'>
                                                            {(arrayHelper) => (
                                                                <input type="file"
                                                                       name='file2'
                                                                       multiple
                                                                       onChange={event => {
                                                                           const {files} = event.target;
                                                                           const file = getFileSchema(files.item(0));
                                                                           if (!file) {
                                                                               arrayHelper.remove(0);
                                                                           }
                                                                           if (Array.isArray(values.file)) {
                                                                               arrayHelper.replace(0, file);
                                                                           } else {
                                                                               arrayHelper.push(file);
                                                                           }
                                                                       }}
                                                                       onBlur={handleBlur}/>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input
                                                            className="file-path validate"
                                                            type="text"
                                                            placeholder="Загрузите один или несколько файлов"/>
                                                    </div>
                                                    {getArrErrorsMessages(errors.file2).map((error) => getError(true, error))}
                                                </div>
                                            </div>
                                        </div>
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
    )
};