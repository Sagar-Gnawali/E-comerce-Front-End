import React, { Component } from 'react';
import { Button } from '../../Common/SubmitButton/Button.component.js';
import { Link } from 'react-router-dom';
import { notify } from '../../../utils/toaster.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { handleError } from '../../../utils/handleError.js';
const DefaultForm = {
    name: '',
    email_address: '',
    phonenumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    date_of_birth: '',
    tempAddress: '',
    perAddress: ''
}

export class Register extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...DefaultForm
            },
            error: {
                ...DefaultForm
            },
            isSubmitting: false,
            isValidForm: false
        }
    }
    HandleChange = (e) => {
        let { name, value } = e.target;
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            this.runFormValidation(name);
        })
    }
    runFormValidation = (fieldName) => {
        let ErrMsg;
        switch (fieldName) {
            case 'username':
                ErrMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 8
                        ? ''
                        : 'Username must contain 8 character !'
                    : 'Required field *'
                break;
            case 'email_address':
                ErrMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@') && this.state.data[fieldName].includes('.com')
                        ? ''
                        : 'Invalid Email'
                    : 'Required field *'
                break;
            case 'phonenumber':
                ErrMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].toString().length >= 10
                        ? ''
                        : 'Number must contains 10 digits '
                    : 'Required field * '
                break;
            case 'password':
                ErrMsg = this.state.data[fieldName]
                    ? this.state.data['confirmPassword']
                        ? this.state.data['confirmPassword'] === this.state.data[fieldName]
                            ? ''
                            : 'Password did not match !'
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'Password must contain at least 8 character !'
                    : 'Required field *'
                break;
            case 'confirmPassword':
                ErrMsg = this.state.data[fieldName]
                    ? this.state.data['password']
                        ? this.state.data['password'] === this.state.data[fieldName]
                            ? ''
                            : 'Password did not match !'
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'Password must contain at least 8 character !'
                    : 'Required field *'
                break;
            default:
                ErrMsg = "";
                break;
        }
        this.setState(prevError => ({
            error: {
                ...prevError.error,
                [fieldName]: ErrMsg
            }
        }), () => {
            const allerror = Object
                .values(this.state.error)
                .filter(error => error);
            this.setState({
                isValidForm: allerror.length === 0
            })
        })
    }
    finalValidForm = () => {
        const { data } = this.state;
        let hasError = false;
        const errors = {
            username: false,
            password: false,
            email_address: false
        }
        if (!data.username) {
            errors.username = true;
            hasError = true;
        }
        if (!data.password) {
            errors.password = true;
            hasError = true;
        }
        if (!data.email_address) {
            errors.email_address = true;
            hasError = true;
        }
        this.setState((prevState) => ({
            error: {
                ...prevState,
                username: errors.username ? 'Required field *' : null,
                password: errors.password ? 'Required field *' : null,
                email_address: errors.email_address ? 'Required field *' : null
            }
        }));
        return hasError;
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        const formHasError = this.finalValidForm();
        if (formHasError) return;
        this.setState({
            isSubmitting: true
        });
        HttpClient.POST('/auth/register', this.state.data)
            .then(res => {
                notify.showInfo('Registration successfull ! Please check your email')
                this.props.history.push("/");
            })
            .catch(error => {
                handleError(error);
                this.setState({
                    isSubmitting:false
                })
            })
    }

    render() {
        return (
            <div className="auth-box">
                <h3>Register</h3>
                <p>This from register and this is for register purpose only</p>
                <form onSubmit={this.HandleSubmit} className="form-group">
                    <label htmlFor="name">Name <strong className="required">*</strong></label>
                    <input type="text" id="name" placeholder="name" name="name"
                        className="form-control" onChange={this.HandleChange} />
                    <label htmlFor="email_address">Email <strong className="required">*</strong></label>
                    <input type="text" id="email_address" placeholder="email address" name="email_address"
                        className="form-control" onChange={this.HandleChange} />
                    <p className="error">{this.state.error.email_address}</p>
                    <label htmlFor="phonenumber">Phone Number <strong className="required">*</strong></label>
                    <input type="number" id="phonenumber" placeholder="Phone number" name="phonenumber"
                        className="form-control" onChange={this.HandleChange} />
                    <p className="error">{this.state.error.phonenumber}</p>
                    <label htmlFor="username">Username <strong className="required">*</strong></label>
                    <input type="text" id="username" placeholder="username" name="username"
                        className="form-control" onChange={this.HandleChange} />
                    <p className="error">{this.state.error.username}</p>
                    <label htmlFor="password">Password <strong className="required">*</strong></label>
                    <input type="password" id="password" name="password"
                        className="form-control" onChange={this.HandleChange} />
                    <p className="error">{this.state.error.password}</p>
                    <label htmlFor="confirmPassword">Confirm Password <strong className="required">*</strong></label>
                    <input type="password" id="confirmPassword" name="confirmPassword"
                        className="form-control" onChange={this.HandleChange} />
                    <p className="error">{this.state.error.confirmPassword}</p>
                    <label htmlFor="gender">Gender <strong className="required">*</strong></label>
                    <input type="text" id="gender" placeholder="Gender" name="gender"
                        className="form-control" onChange={this.HandleChange} />
                    <label htmlFor="date_of_birth">Date of birth <strong className="required">*</strong></label>
                    <input type="date" id="date_of_birth" name="date_of_birth"
                        className="form-control" onChange={this.HandleChange} />
                    <label htmlFor="tempAddress">Temporary Address</label>
                    <input type="text" id="tempAddress" placeholder="Temporary Address" name="tempAddress"
                        className="form-control" onChange={this.HandleChange} />
                    <label htmlFor="perAddress">Permanent Address <strong className="required">*</strong></label>
                    <input type="text" id="perAddress" placeholder="Permanent Address" name="perAddress"
                        className="form-control" onChange={this.HandleChange} />
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!this.state.isValidForm}
                    />
                    <p>Already registered ?</p>
                    <p><Link to="/login">Back to login</Link></p>
                </form>
            </div>
        )
    }
}
