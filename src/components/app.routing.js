import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ForgotPassword } from './Auth/ForgetPassword/ForgotPassword.component.js';
import Login from './Auth/Login/login.component.js';
import { Register } from './Auth/Register/Register.component.js';
import { ResetPassword } from './Auth/ResetPassword/ResetPassword.component.js';
import { Messages } from './Common/Messages/Messages.component.js';
import { NavBar } from './Common/NavBar/navbar.component.js';
import { AddProduct } from './Products/AddProduct/AddProduct.component.js';
import { EditProduct } from './Products/EditProduct/EditProduct.component.js';
import { SearchProduct } from './Products/SearchProduct/SearchProduct.component.js';
import { ViewProduct } from './Products/ViewProduct/ViewProducts.component.js';
import { SideBar } from './SideBar/sidebar.component.js';
import { ProductDetailsLanding } from './Products/ProductDetails/ProductDetailsLanding.js';
import { HomePage } from './Home/home.component.js';
const Home = (props) => {
    return (
        <p> Welcome to home page !</p>
    )
}
const About = (props) => {
    return (
        <p>This is About page !</p>
    )
}

const Dashboard = (props) => {
    return (
        <>
            <h3>Welcome to our dashboard page !</h3>
        </>
    )
}
const NotFound = (props) => {
    return (
        <>
            <p>Not Found</p>
            <img src='/images/notfoundfile.jpeg' alt="NotFound" />
        </>
    )
}
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return localStorage.getItem('token')
        ? <Route {...rest} render={routeProps => (
            <>
                <NavBar isLoggedIn={true}></NavBar>
                <SideBar isLoggedIn={true} />
                <div className="main">
                    <Component {...routeProps}></Component>
                </div>
            </>
        )}></Route>
        : <Redirect to="/"></Redirect>
}
const PublicRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={routeProps => (
        <>
            <NavBar isLoggedIn={localStorage.getItem('token') ? true : false} />
            <SideBar isLoggedIn={localStorage.getItem('token') ? true : false} />
            <div className="main">
                <Component{...routeProps} />
            </div>
        </>
    )} />
}

const Approuting = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/login" component={Login} />
                <PublicRoute path="/register" exact component={Register} />
                <ProtectedRoute path="/home" exact component={Home} />
                <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                <ProtectedRoute path="/add_product" exact component={AddProduct} />
                <ProtectedRoute path="/view_product" component={ViewProduct} />
                <ProtectedRoute path="/search_product" component={SearchProduct} />
                <ProtectedRoute path="/edit_product/:id" component={EditProduct} />
                <ProtectedRoute path="/about" component={About}></ProtectedRoute>
                <ProtectedRoute path="/message" component={Messages}></ProtectedRoute>
                <PublicRoute path="/forgot_password" component={ForgotPassword} />
                <PublicRoute path="/reset_password/:user_id" component={ResetPassword} />
                <PublicRoute path="/product_detail/:product_id" component={ProductDetailsLanding} />
                <PublicRoute path='/' component={HomePage}/>
                <PublicRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}
export default Approuting;