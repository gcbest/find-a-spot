import React, {Component} from 'react';
const io = require('socket.io-client');
const socket = io();

import Nav from './Nav';

class SignIn extends Component {
    componentDidMount () {
        socket.on('connect', function () {
            console.log('Connected to server');
            var params = jQuery.deparam(window.location.search);

            socket.emit('join', params, function(err) {
                if (err) {
                    alert(err);
                    window.location.href = '/';
                } else {
                    console.log('No error');
                }
            });
        });
    }
    render () {
        return (
            <div>
                <div className="centered-form">
                    <Nav/>
                    <h1>Find a spot near you!</h1>
                    <div className="centered-form__form">
                        <form action="/mapview">
                            <div className="form-field">
                                <h3>Join a chat</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input type="text" name="name" autoFocus/>
                            </div>
                            <div className="form-field">
                                <label>Enter Your Zip Code's Room</label>
                                <input type="hidden" name="room"/>
                            </div>
                            <div className="form-field">
                                <button>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;