import React, { Component } from 'react';
import { Button } from '../../Common/SubmitButton/Button.component';
import './login.component.css';
import { Link } from 'react-router-dom';
import { notify } from '../../../utils/toaster';
import { handleError } from '../../../utils/handleError';
import { HttpClient } from '../../../utils/httpClient';
const defaultForm = {
    username: false,
    password: false
}
class Login extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            remember_me: '',
            isSumbitting: false,
            isValidForm: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        let rememberMe = localStorage.getItem('remember_me');
        const hasToken = localStorage.getItem('token');
        if (rememberMe && hasToken) {
            this.props.history.push({
                pathname: '/dashboard/admin'
            })
        }
    }
    handleChange(e) {
        let { name, value, type, checked } = e.target; 
        if (type === "checkbox") {
            this.setState({
                remember_me: checked
            })
        }
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            if (this.state.error[name]) {
                this.validateForm();

            }
        });
    }
    validateForm = () => {
        const { data } = this.state;
        let isValid = true;
        let usernameError = false;
        let passwordError = false;
        if (!data.username) {
            isValid = false;
            usernameError = true;
        }
        if (!data.password) {
            isValid = false;
            passwordError = true;
        }
        this.setState((prevError) => ({
            error: {
                ...prevError.error,
                username: usernameError,
                password: passwordError
            },
            isValidForm: isValid
        }))
        return isValid;

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const isValidForm = this.validateForm();
        if (!isValidForm) return;
        this.setState({
            isSubmitting: true
        })
        HttpClient.POST('/auth/login', this.state.data)
            .then(res => {
                notify.showSuccess(`Welcome ${res.data.user.username}`);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('remember_me', this.state.remember_me);
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                handleError(error);
                this.setState({
                    isSubmitting: false
                })
            })

    }
    render() {
        return (
            <div className="auth-box">
                <h3>Login from</h3>
                <h4>Please login to continue </h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Username or Email address"
                        name="username" className="form-control"
                        onChange={this.handleChange} />
                    <p className='error'>{this.state.error.username && ('Required field * ')}</p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password"
                        placeholder="password" className="form-control"
                        onChange={this.handleChange} />
                    <p className='error'>{this.state.error.password && ('Required field *')}</p>
                    <input type="checkbox" name="remember_me" onChange={this.handleChange} /> Remember me
                    <br />
                    <Button
                        isSubmitting={this.state.isSumbitting}
                        isDisabled={!this.state.isValidForm}
                        enabledLabel='Login'
                        disabledLabel='Login in..'

                    />
                </form>
                <p>Don't have an account ?</p>
                <p className="float-right">Register<Link to="/register"> here</Link></p>
                <p className="float-left"><Link to="/forgot_password">forgot password ?</Link></p>
            </div>
        )
    }
}
export default Login;