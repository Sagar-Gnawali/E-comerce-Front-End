import React, { Component } from 'react';
import { handleError } from '../../../utils/handleError';
import { HttpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import { Button } from '../../Common/SubmitButton/Button.component';
const defaultForm = {
    password: '',
    confirmPassword: ''
}
export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            this.formValidation(name);
        })
    }
    formValidation = (fieldName) => {
        let ErrorMessage;
        switch (fieldName) {
            case 'password':
                ErrorMessage = this.state.data[fieldName]
                    ? this.state.data['confirmPassword']
                        ? this.state.data['confirmPassword'] === this.state.data[fieldName]
                            ? ''
                            : "Password didn't match"
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'Password must contains 8 character !'
                    : 'Required field *'
                break;
            case 'confirmPassword':
                ErrorMessage = this.state.data[fieldName]
                    ? this.state.data['password']
                        ? this.state.data['password'] === this.state.data[fieldName]
                            ? ''
                            : "Password didn't match"
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'Password must contains 8 character '
                    : 'Required field *'
                break;
            default:
                ErrorMessage = '';
                break;
        }
        this.setState(prevError => ({
            error: {
                ...prevError.error,
                [fieldName]: ErrorMessage
            }
        }), () => {
            const allerrors = Object
                .values(this.state.error)
                .filter(err => err);

            this.setState({
                isValidForm: allerrors.length === 0
            })
        })
    }
    componentDidMount() {
        this.userId = this.props.match.params['user_id'];
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        HttpClient
            .POST(`/auth/reset-password/${this.userId}`, this.state.data)
            .then(res => {
                notify.showSuccess('Password reset successfully 😀 !');
                this.props.history.push("/");
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
                <h3>Reset Password</h3>
                <p>Please choose your password</p>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="password">Password:</label>
                    <input type='password' id="password" name="password" onChange={this.handleChange}
                        className="form-control" />
                    <p className="error">{this.state.error.password}</p>
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword"
                        onChange={this.handleChange} className="form-control" />
                    <p className="error">{this.state.error.confirmPassword}</p>
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!this.state.isValidForm}
                    />
                </form>
            </div >
        )
    }
}
