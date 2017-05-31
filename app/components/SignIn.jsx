import React, {Component} from 'react';
import axios from 'axios';
const io = require('socket.io-client');
const socket = io();

var deparam = require('jquery-deparam');


import Nav from './Nav';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            room: ''
        };
    }
    componentDidMount() {
        socket.on('connect', function () {
            console.log('Connected to server');
        });
    }
    handleClick(e) {
        // var params = deparam(window.location.search);
        e.preventDefault();


        var that = this;
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            //     position.coords.latitude,
            //     position.coords.longitude
            var obj = {lat: position.coords.latitude, lng: position.coords.longitude};

            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.lat},${obj.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
            axios.get(url)
                .then((response) => {
                debugger;
                    that.setState({
                        name: that.refs.name.value,
                        room: response.data.results[0].address_components[7].long_name
                    });

                    var params = {
                        name: that.state.name,
                        room: that.state.room
                    };

                    socket.emit('join', params, function(err) {
                        if (err) {
                            alert(err);
                            window.location.href = '/';
                        } else {
                            console.log('No error');
                            console.log('params', params);
                        }
                    });
                })
                .catch((error) => {
                    throw error;
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
                                <input type="text" ref="name" name="name" autoFocus/>
                            </div>
                            <div className="form-field">
                                <label>Enter Your Zip Code's Room</label>
                                <input type="hidden" name="room"/>
                            </div>
                            <div className="form-field">
                                <button onClick={this.handleClick.bind(this)}>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;