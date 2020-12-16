import React from 'react';
import {NavLink} from "react-router-dom";
import logo from '../images/IMG_1737.jpg'

export const Navbar = () => {

    return (
        <ul id="nav-mobile" className="sidenav sidenav-fixed blue-grey darken-3">
            <div className="row top_profile">
                <div className="col s4">
                    <i className="small material-icons md-light circle blue-grey lighten-1 top_profile_i_l z-depth-3">settings</i>
                </div>
                <div className="col s4">
                    <img src={logo} alt="" className="circle responsive-img top_profile_img z-depth-3"/>
                </div>
                <div className="col s4">
                    <i className="small material-icons md-light circle blue-grey lighten-1 top_profile_i_r z-depth-3">notifications</i>
                </div>
            </div>
            <div className="row center-align white-text">
                <h5>Даниил</h5>
            </div>
            <li>
                <a href="" className="white-text">
                    <i className="extra-small material-icons md-light">bookmark</i>
                    <h6 className="h6_navbar">Мои заявления</h6>
                </a>
            </li>
            <li>
                <NavLink to="/personal-data" className="white-text">
                    <i className="extra-small material-icons md-light">contacts</i>
                    <h6 className="h6_navbar">Персональные данные</h6>
                </NavLink>
            </li>
            <li>
                <a href="" className="white-text">
                    <i className="extra-small material-icons md-light">collections_bookmark</i>
                    <h6 className="h6_navbar">Моё поступление</h6>
                </a>
            </li>
        </ul>
    )
};