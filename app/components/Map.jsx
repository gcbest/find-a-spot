import React, {Component} from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import axios from 'axios';

var initMap = require('../api/googlemaps');
var {userCoords} = require('./SignIn');

class Map extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        const scriptInit = document.createElement("script");
        scriptInit.text = initMap;

        var that = this;
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s&callback=initMap";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
        document.body.appendChild(scriptInit);


        // Grab user location
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            initMap(userCoords, that.props.openSpots);

        });
    }
    formatAddress(location) {
        var that = this;
        var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
        return axios.get(url)
            .then((response) => {
                location.address = response.data.results[0].formatted_address;
                location.zipCode = response.data.results[0].address_components[7].long_name;

                that.props.addLocation(location);
                initMap(location, that.props.openSpots);
            })
            .catch((error) => {
                throw error;
            });
    }
    handleClick () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }

        var that = this;

        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            //     position.coords.latitude,
            //     position.coords.longitude
            var obj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                id: uuid(),
                markedOpenAt: moment().unix(),
                markedClosedAt: undefined
            };

            var obj2 = {lat: 41.003, lng: -72.48502};
            that.props.addLocation(obj2);

            that.formatAddress(obj);
        }, function() {
            // locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });
    }
    render () {
        return (
            <div>
                <div id="map"/>
                <button id="send-location" onClick={this.handleClick.bind(this)}>Mark the open spot here</button>
            </div>
        );
    }
}

export default Map;