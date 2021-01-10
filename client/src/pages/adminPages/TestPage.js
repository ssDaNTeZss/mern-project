import React, {useContext, useEffect, useState} from 'react';
import {AdminNavbar} from "../../components/AdminNavbar";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {FieldArray, Formik} from "formik";
import M from "materialize-css";
import * as yup from "yup";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const LEVELOFEDUCATION = require('../../dataForSelect/levelOfEducation');

export const TestPage = () => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();

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

    const getFileSchema = (file) => file && ({
        file: file,
        type: file.type,
        name: file.name
    });

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        console.log(file);
        formData.append('file', file);
        console.log(formData.getAll('file'));
        try {
            const data = await request(
                '/api/upload/account-photo',
                'POST',
                {formData},
                {
                    'Content-Type': 'multipart/form-data'
                }
            );
            message(data.message);
        } catch (e) {
        }
    };

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

    const validationsSchema = yup.object().shape({
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 10 МБ', (value) => {
                if (!value) return false;
                return value.size < 10485760
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg', 'image/pjpeg'], 'Добавьте файл с правильным форматом').required('Добавьте файл с правильным форматом'),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required('Обязательное поле')
    });

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
                        file: undefined
                    }}
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
                                            <form onSubmit={onSubmit}>
                                                <div className="row" style={{margin: 0}}>
                                                    <div className="file-field input-field">
                                                        <div className="btn white red-text text-accent-2">
                                                            <i className="material-icons right">add_a_photo</i>
                                                            <span>Добавить фото</span>
                                                            <FieldArray name='file'>
                                                                {(arrayHelper) => (
                                                                    <input type="file"
                                                                           name='file'
                                                                           id='customFile'
                                                                           onChange={onChange}
                                                                           onBlur={handleBlur}/>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text"/>
                                                        </div>
                                                        {getArrErrorsMessages(errors.file).map((error) => getError(true, error))}
                                                    </div>
                                                </div>

                                                <input
                                                    type='submit'
                                                    value='Upload'
                                                    className='btn btn-primary btn-block mt-4'
                                                />
                                            </form>
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