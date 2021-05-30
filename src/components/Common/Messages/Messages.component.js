import React, { Component } from 'react';
import './Messages.component.css';
import * as io from 'socket.io-client';
import { FiSend } from 'react-icons/fi';
import { relativeTime } from '../../../utils/DateAndTime';
import { notify } from '../../../utils/toaster';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
export class Messages extends Component {
    constructor() {
        super();
        this.state = {
            msgBody: {
                senderId: '',
                senderName: '',
                receiverId: '',
                receiverName: '',
                message: '',
                time: ''
            },
            messages: [],
            users: []
        }
    }
    componentDidMount() {
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.socket = io(SOCKET_URL);
        this.socketStuff();
    }
    socketStuff = () => {
        this.socket.emit('new-user', this.currentUser.username);
        this.socket.on('reply-message-own', (msg) => {
            const { messages } = this.state;
            messages.push(msg);
            this.setState({
                messages
            })
        })
        this.socket.on('reply-message-for', (msg) => {
            const { messages, msgBody } = this.state;
            msgBody.receiverId = msg.senderId;
            msgBody.receiverName = msg.senderName;
            messages.push(msg);
            this.setState({
                messages
            })
        })
        this.socket.on('users', (users) => {
            this.setState({
                users
            })
        })
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => ({
            msgBody: {
                ...prevState.msgBody,
                [name]: value
            }
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { msgBody } = this.state;
        if (!msgBody.receiverId) {
            return notify.showInfo('Please select a user 🙃');
        }
        msgBody.time = Date.now();
        msgBody.senderName = this.currentUser.username;
        let senderInfo = this.state.users.find(user => user.username === this.currentUser.username);
        msgBody.senderId = senderInfo.id;
        this.socket.emit('new-message', msgBody);
        this.setState(prevState => ({
            msgBody: {
                ...prevState.msgBody,
                message: ''
            }
        }))
    }
    selectUser = (user) => {
        this.setState(prevState => ({
            msgBody: {
                ...prevState.msgBody,
                receiverId: user.id,
                receiverName: user.username
            }
        }))
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <ins>Messages</ins>
                    <div className="chat-box">
                        <ul>
                            {
                                this.state.messages.map((msg, index) => (
                                    <li key={index} style={{ listStyleType: 'none' }}>
                                        <h3 style={{ color: 'blue' }}>{msg.senderName}</h3>
                                        <p>{msg.message}</p>
                                        <small>{relativeTime(msg.time, 'minute')}</small>
                                        <hr />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <input style={{ display: 'inline' }} value={this.state.msgBody.message}
                            className="sendfield" name="message" type="text"
                            placeholder="type your message" onChange={this.handleChange}
                        />
                        <button style={{ display: 'inline' }} type="submit">
                            <FiSend color="blue" size="1rem"
                            />
                        </button>
                    </form>
                </div>
                <div className="col-md-6">
                    <ins>Users</ins>
                    <div className="chat-box">
                        <ul>
                            {
                                this.state.users.map((user, index) => (
                                    <li style={{ listStyleType: 'none' }} key={index}>
                                        <button className="btn btn-default" onClick={() => this.selectUser(user)}>
                                            {user.username}
                                        </button>
                                        <hr />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
