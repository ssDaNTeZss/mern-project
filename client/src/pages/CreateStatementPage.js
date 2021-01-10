import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {FieldArray, Formik} from "formik";
import M from "materialize-css";
import * as yup from "yup";
import {useHttp} from "../hooks/http.hook";

const EDUCATION = require('../dataForSelect/educationalInstitution');
const ACHIEVEMENTS = require('../dataForSelect/individualAchievements');
const LEVELOFEDUCATION = require('../dataForSelect/levelOfEducation');
const FORMOFEDUCATION = require('../dataForSelect/formOfEducation');
const LISTOFEXAMS = require('../dataForSelect/listOfExams');

const sourceOfFinancingArr = [
    {value: 'budget', label: 'Бюджет'}
];

const competitionArr = [
    {value: 'generalCompetition', label: 'Общий конкурс'},
    {value: 'targetAgreement', label: 'Целевой договор'},
    {value: 'specialRights', label: 'Особые права'}
];


export const CreateStatementPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();

    const [data, setData] = useState([]);
    const [LOE, setLOE] = useState();
    const [FOE, setFOE] = useState();
    const [DOS, setDOS] = useState([]);
    const [Arr, setArr] = useState([]);
    const [SOF, setSOF] = useState([]);
    const [Comp, setComp] = useState();
    const [Exam1, setExam1] = useState([]);
    const [Exam2, setExam2] = useState([]);
    const [Exam3, setExam3] = useState([]);
    const [Achieve, setAchieve] = useState([]);

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

    const getData = useCallback(async () => {
        try {
            const directions = await request(
                '/api/directions/data/getAll',
                'GET'
            );
            console.log(directions);
            setData(directions);
        } catch (e) {
        }
    }, [request]);

    useEffect(() => {
        getData();
    }, [getData]);

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
        // file: yup.array().of(yup.object().shape({
        //     file: yup.mixed().test('fileSize', 'Размер файла больше 10 МБ', (value) => {
        //         if (!value) return false;
        //         return value.size < 10485760
        //     }).required(),
        //     type: yup.string().oneOf(['image/png', 'image/jpeg', 'image/pjpeg', 'application/pdf'], 'Добавьте файл с правильным форматом').required('Добавьте файл с правильным форматом'),
        //     name: yup.string().required()
        // }).typeError('Добавьте файл')).required('Обязательное поле'),
        // file2: yup.array().of(yup.object().shape({
        //     file: yup.mixed().test('fileSize', 'Размер файла больше 10 МБ', (value) => {
        //         if (!value) return false;
        //         return value.size < 10485760
        //     }).required(),
        //     type: yup.string().oneOf(['image/png', 'image/jpeg', 'image/pjpeg', 'application/pdf'], 'Добавьте файл с правильным форматом').required('Добавьте файл с правильным форматом'),
        //     name: yup.string().required()
        // }).typeError('Добавьте файл'))
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

    const setAchievementsList = (e) => {
        let ach = Achieve;
        let st = false;
        for (let i = 0; i < ach.length; i++) {
            if (ach[i].value === e.target.value) {
                ach.splice(i, 1);
                setAchieve(ach);
                st = true;
            }
        }

        if (!st) {
            ach.push({value: e.target.value});
            setAchieve(ach);
        }
        console.log(ach);
    };

    let achievementsList = ACHIEVEMENTS.length > 0
        && ACHIEVEMENTS.map((item) => {
            return (
                <div className="col s4">
                    <label>
                        <input type="checkbox" value={item.value} name="achievements" onChange={setAchievementsList}/>
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

    const setLevelOfEducation = (e) => {
        setLOE(e.target.value);
        console.log(e.target.value);
        console.log(LOE);
    };

    let levelOfEducationList = LEVELOFEDUCATION.length > 0
        && LEVELOFEDUCATION.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    const setFormOfEducation = (e) => {
        setFOE(e.target.value);
        console.log(e.target.value);
        console.log(FOE);
        setArr([]);
        let arr = Arr;

        for (let i = 0; i < data.length; i++) {
            if (data[i].levelOfEducation === LOE && data[i].formOfEducation === FOE) {
                arr.push({value: data[i]._id, label: data[i].directionOrSpecialty});
                setArr(arr);
            }
        }
        console.log(Arr);
    };

    let formOfEducationList = FORMOFEDUCATION.length > 0
        && FORMOFEDUCATION.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    const setDirectionOrSpecialty = (e) => {
        setDOS({id: e.target.value});
        console.log(e.target.value);
        setSOF([]);
        let arr2 = new Array();
        setExam1([]);
        setExam2([]);
        setExam3([]);
        for (let i = 0; i < data.length; i++) {

            if (data[i]._id === DOS.id && data[i].budget == true) {
                arr2.push({value: 'budget', label: 'Бюджет'});
            }

            if (data[i]._id === DOS.id && data[i].offBudget == true) {
                arr2.push({value: 'offBudget', label: 'Внебюджет'});
            }

            if (data[i]._id === DOS.id) {
                setExam1({value: data[i].exam1, minScore: data[i].minScore1});
                setExam2({value: data[i].exam2, minScore: data[i].minScore2});
                setExam3({value: data[i].exam3, minScore: data[i].minScore3});
            }
        }
        setSOF(arr2);
    };

    let directionOrSpecialtyList = Arr.length > 0
        && Arr.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    let sourceOfFinancingList = SOF.length > 0
        && SOF.map((item) => {
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    let competitionList = competitionArr.length > 0
        && competitionArr.map((item) => {
            if (item.value === (data._id)) {
            }
            return (
                <option value={item.value}>{item.label}</option>
            )
        }, this);

    const setCompetition = (e) => {
        setComp(e.target.value);
    };

    let exam1List = LISTOFEXAMS.length > 0
        && LISTOFEXAMS.map((item) => {
            if (item.value === Exam1.value) {
                return (
                    <b>{item.label} (Мин. балл {Exam1.minScore})</b>
                )
            }
        }, this);

    let exam2List = LISTOFEXAMS.length > 0
        && LISTOFEXAMS.map((item) => {
            if (item.value === Exam2.value) {
                return (
                    <b>{item.label} (Мин. балл {Exam2.minScore})</b>
                )
            }
        }, this);

    let exam3List = LISTOFEXAMS.length > 0
        && LISTOFEXAMS.map((item) => {
            if (item.value === Exam3.value) {
                return (
                    <b>{item.label} (Мин. балл {Exam3.minScore})</b>
                )
            }
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
                        document: '',
                        series: '',
                        documentNumber: '',
                        dateOfIssue: '',
                        educationalInstitution: '',
                        nameEI: '',
                        yearOfEnding: '',
                        file: undefined,
                        file2: undefined,
                        levelOfEducation: LOE || '',
                        formOfEducation: FOE || '',
                        competition: '',
                        exam1: Exam1.value || '',
                        minScore1: '',
                        typeExam1: ''

                    }}
                            // validationSchema={validationsSchema}
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
                                                        <span>Добавить сканы подтверждающих документов</span>
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
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">assignment_turned_in</i>
                                            <b>Выбор направления</b>
                                        </div>
                                        <div className="collapsible-body">
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <select
                                                        name='levelOfEducation'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.levelOfEducation}
                                                        onChange={setLevelOfEducation}
                                                    >
                                                        <option value="" disabled selected>Выберите уровень
                                                            образования
                                                        </option>
                                                        {levelOfEducationList}
                                                    </select>
                                                    <label htmlFor='levelOfEducation'>3.1 Уровень
                                                        образования *</label>
                                                    {touched.levelOfEducation && errors.levelOfEducation &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.levelOfEducation}</span>}
                                                </div>

                                                <div className="input-field col s6">
                                                    <select
                                                        name='formOfEducation'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.formOfEducation}
                                                        onChange={setFormOfEducation}
                                                    >
                                                        <option value="" disabled selected>Выберите форму обучения
                                                        </option>
                                                        {formOfEducationList}
                                                    </select>
                                                    <label htmlFor='formOfEducation'>3.2 Форма обучения *</label>
                                                    {touched.formOfEducation && errors.formOfEducation &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.formOfEducation}</span>}
                                                </div>
                                            </div>
                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s12">
                                                    <select
                                                        name='directionOrSpecialty'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.directionOrSpecialty}
                                                        onChange={setDirectionOrSpecialty}
                                                    >
                                                        <option value="" disabled selected>Выберите
                                                            Направление/Специальность
                                                        </option>
                                                        {directionOrSpecialtyList}
                                                    </select>
                                                    <label htmlFor='directionOrSpecialty'>3.3 Направление/Специальность
                                                        *</label>
                                                    {touched.directionOrSpecialty && errors.directionOrSpecialty &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.directionOrSpecialty}</span>}
                                                </div>
                                            </div>

                                            <div className="row" style={{margin: 0}}>
                                                <div className="input-field col s6">
                                                    <select
                                                        name='sourceOfFinancing'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.sourceOfFinancing}
                                                    >
                                                        <option value="" disabled selected>Выберите
                                                        </option>
                                                        {sourceOfFinancingList}
                                                    </select>
                                                    <label htmlFor='sourceOfFinancing'>3.4 Источник финансирования
                                                        *</label>
                                                    {touched.sourceOfFinancing && errors.sourceOfFinancing &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.sourceOfFinancing}</span>}
                                                </div>

                                                <div className="input-field col s6">
                                                    <select
                                                        name='competition'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.competition}
                                                    >
                                                        <option value="" disabled selected>Выберите
                                                        </option>
                                                        {competitionList}
                                                    </select>
                                                    <label htmlFor='competition'>3.5 Конкурс
                                                        *</label>
                                                    {touched.competition && errors.competition &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.competition}</span>}
                                                </div>
                                            </div>

                                            <div className="row" style={{margin: 0}}>
                                                <div className="valign-wrapper col s6" style={{height: 84}}>
                                                    {exam1List}
                                                </div>
                                                    <div className="input-field col s6">
                                                        <select
                                                            name='typeExam1'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.typeExam1}
                                                        >
                                                            <option value="" disabled selected>Выберите
                                                            </option>
                                                            <option value="universityExam">Экзамен в университете
                                                            </option>
                                                            <option value="universityExam">Результат по аттестату
                                                            </option>
                                                        </select>
                                                        <label htmlFor='typeExam1'>3.6 Тип сдачи первого экзамена
                                                            *</label>
                                                        {touched.typeExam1 && errors.typeExam1 &&
                                                        <span className="helper-text red-text" data-error="wrong"
                                                              data-success="right">{errors.typeExam1}</span>}
                                                    </div>
                                            </div>

                                            <div className="row" style={{margin: 0}}>
                                                <div className="valign-wrapper col s6" style={{height: 84}}>
                                                    {exam2List}
                                                </div>
                                                <div className="input-field col s6">
                                                    <select
                                                        name='typeExam2'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.typeExam2}
                                                    >
                                                        <option value="" disabled selected>Выберите
                                                        </option>
                                                        <option value="universityExam">Экзамен в университете
                                                        </option>
                                                        <option value="universityExam">Результат по аттестату
                                                        </option>
                                                    </select>
                                                    <label htmlFor='typeExam2'>3.7 Тип сдачи второго экзамена
                                                        *</label>
                                                    {touched.typeExam2 && errors.typeExam2 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.typeExam2}</span>}
                                                </div>

                                            </div>

                                            <div className="row" style={{margin: 0}}>
                                                <div className="valign-wrapper col s6" style={{height: 84}}>
                                                    {exam3List}
                                                </div>
                                                <div className="input-field col s6">
                                                    <select
                                                        name='typeExam3'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.typeExam3}
                                                    >
                                                        <option value="" disabled selected>Выберите
                                                        </option>
                                                        <option value="universityExam">Экзамен в университете
                                                        </option>
                                                        <option value="universityExam">Результат по аттестату
                                                        </option>
                                                    </select>
                                                    <label htmlFor='typeExam3'>3.8 Тип сдачи третьего экзамена
                                                        *</label>
                                                    {touched.typeExam3 && errors.typeExam3 &&
                                                    <span className="helper-text red-text" data-error="wrong"
                                                          data-success="right">{errors.typeExam3}</span>}
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