import React, {useContext, useEffect} from 'react';
import {Navbar} from "../components/Navbar";
import {NavLink, useHistory} from 'react-router-dom'
import M from 'materialize-css';
import logo from "../images/IMG_1737.jpg";
import {AuthContext} from "../context/AuthContext";


export const PersonalDataPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

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
                    <div className="col s12">
                        <ul className="collapsible popout">
                            <li>
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
                                            />
                                            <label htmlFor='lastName'>1.1 Фамилия *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s6">
                                            <input
                                                type='text'
                                                className='red-input'
                                                name='firstName'
                                            />
                                            <label htmlFor='firstName'>1.2 Имя *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s6">
                                            <input
                                                type='text'
                                                className='red-input'
                                                name='patronymic'
                                            />
                                            <label htmlFor='patronymic'>1.3 Отчество</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s6" style={{marginBottom: 69}}>
                                            <label>
                                                <input type="checkbox" className="filled-in checkbox-orange"/>
                                                <span>1.4 Отчество в паспорте не указано</span>
                                            </label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s4">
                                            <input
                                                type='Date'
                                                className='red-input'
                                                name='DOB'
                                            />
                                            <label htmlFor='DOB'>1.5 Дата рождения *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s4">
                                            <input
                                                type='text'
                                                className='red-input'
                                                name='BPL'
                                            />
                                            <label htmlFor='BPL'>1.6 Место рождения (по паспорту) *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s4">
                                            <select>
                                                <option value="" disabled selected>Выберите пол</option>
                                                <option value="1">Мужской</option>
                                                <option value="2">Женский</option>
                                            </select>
                                            <label>1.7 Пол *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s6">
                                            <select>
                                                <option value="" disabled selected>Выберите граждансво</option>
                                                <option value="1">Test 1</option>
                                                <option value="2">Test 2</option>
                                            </select>
                                            <label>1.8 Гражданство *</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s6">
                                            <select>
                                                <option value="" disabled selected></option>
                                                <option value="1">Test 1</option>
                                                <option value="2">Test 2</option>
                                            </select>
                                            <label>1.9 Второе гражданство (при наличии двойного гражданства)</label>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s4">
                                            <button className="btn white red-text text-accent-2">
                                                Добавить фото
                                            </button>
                                            <p className="red-text"></p>
                                        </div>
                                        <div className="input-field col s8" >
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
                    </div>
                </div>
            </div>

        </div>
    )
};