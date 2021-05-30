import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.component.css';

export const SideBar = (props) => {
    const content = props.isLoggedIn ?
        <div className="sidebar">
            <Link to="/add_product">Add Product</Link>
            <Link to="/view_product">View Product</Link>
            <Link to="/search_product">Search Product</Link>
            <Link to="/message">Messages</Link>
            <Link to="/notification">Notifications</Link>
            <Link to="/profile">Profile</Link>
        </div> : null;
    return content;
}