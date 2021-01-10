import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import logo from '../images/IMG_1737.jpg'
import {AuthContext} from "../context/AuthContext";

export const AdminNavbar = () => {
    const auth = useContext(AuthContext);

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
                <h5>{ auth.userName }</h5>
            </div>
            <li>
                <a href="" className="white-text">
                    <i className="extra-small material-icons md-light">bookmark</i>
                    <h6 className="h6_navbar">Мои заявления</h6>
                </a>
                <NavLink to="/directions" className="white-text">
                    <i className="extra-small material-icons md-light">collections_bookmark</i>
                    <h6 className="h6_navbar">Направления</h6>
                </NavLink>
                <NavLink to="/test" className="white-text">
                    <i className="extra-small material-icons md-light">settings</i>
                    <h6 className="h6_navbar">TEST PSGE</h6>
                </NavLink>
            </li>
        </ul>
    )
};