import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
const io = require('socket.io-client');
const socket = io();

var initMap = require('../api/googlemaps');

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: '',
            redirect: false
        };
    }
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s&callback=initMap";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
    }
    componentDidMount() {
        socket.on('connect', function () {
            console.log('Connected to server');
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;

        // Grab user location
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            // Convert Lat & Lng into zip code
            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCoords.lat},${userCoords.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
            axios.get(url)
                .then((response) => {
                    that.setState({
                        name: that.refs.name.value,
                        room: response.data.results[0].address_components[7].long_name,
                        redirect: true
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
        var {redirect, room} = this.state;

        if (redirect) {
            return <Redirect to={`/mapview/${room}`}/>;
        }
        return (
            <div>
                <div id="header">
                    <h1 className="page-title">Find a spot near you!</h1>
                </div>
                <div className="centered-form">
                    <div className="centered-form__form">
                        <form id="signin-form">
                            <div className="form-field">
                                <h3>Join a chat</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input type="text" ref="name" name="name" autoFocus/>
                            </div>
                            <div className="form-field">
                                <label>Enter Your Zip Code's Room</label>
                                <input ref="room" type="hidden" name="room"/>
                            </div>
                            <div className="form-field">
                                <button onClick={this.handleSubmit.bind(this)}>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;