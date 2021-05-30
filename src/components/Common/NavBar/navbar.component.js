import React from 'react';
import './navBarfile.css';
import { NavLink, withRouter } from 'react-router-dom'
import { redirectToHomePage } from '../../../utils/util';
const logout = (props) => {
    console.log('Logout props contains the following >>', props);
    localStorage.clear();
    redirectToHomePage(props);
}
const NavBarComponent = (props) => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let content = props.isLoggedIn ?
        <ul className="navList">
            <li className="navItem">
                <NavLink activeClassName="selected" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="navItem">
                <NavLink activeClassName="selected" to="/home">Home</NavLink>
            </li>
            <li className="navItem">
                <NavLink activeClassName="selected" to="/about">About</NavLink>
            </li>
            <li className="navItem">
                <button className="btn btn-success logout" onClick={() => logout(props)}>Logout</button>
                <p className="user-info">{currentUser.username}</p>
            </li>
        </ul>
        : <ul className="navList">
            <li className="navItem">
                <NavLink to="/home">Home</NavLink>
            </li>
            <li className="navItem">
                <NavLink to="/login">Login</NavLink>
            </li>
            <li className="navItem">
                <NavLink to="/register">Register</NavLink>
            </li>
        </ul>;
    return (
        <div className="navBar">
                {content}
        </div>
    )
}

export const NavBar = withRouter(NavBarComponent);