import React, { Component } from 'react';
import { handleError } from '../../../utils/handleError';
import { HttpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import { Button } from '../../Common/SubmitButton/Button.component';
export class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            emailError: '',
            isSubmitting: false
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            if (this.state.emailError) {
                this.validateForm();
            }
        })

    }
    validateForm = () => {
        let emailError;
        let validForm = true;
        if (this.state.email) {
            if (!(this.state.email.includes('@') && this.state.email.includes('.com'))) {
                emailError = "Invalid email address";
                validForm = false;
            }
        } else {
            emailError = "Required field *";
            validForm = false;

        }
        this.setState({
            emailError
        })
        return validForm;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let isvalidForm = this.validateForm();
        if (!isvalidForm) return;
        this.setState({
            isSubmitting: true
        })
        HttpClient
            .POST('/auth/forgot-password', { email: this.state.email })
            .then(res => {
                console.log('res is >>', res);
                notify.showInfo('Password reset link is send to your email please check your mailbox.')
                this.props.history.push('/')
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
                <h2>Forgot Password</h2>
                <p>
                    Please provide your email address to reset your password.
                </p>
                <form className="form-group" onSubmit={this.handleSubmit} >
                    <label htmlFor="email">Email:</label>
                    <input type='text' onChange={this.handleChange}
                        name="email" id="email" placeholder="Provide your email address "
                        className="form-control" />
                    <p className="error">{this.state.emailError}</p>
                    <Button
                        isSubmitting={this.state.isSubmitting}
                    />
                </form>
            </div>
        )
    }
}