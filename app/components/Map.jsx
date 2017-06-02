import React, {Component} from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import axios from 'axios';

var initMap = require('../api/googlemaps');

class Map extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        const scriptInit = document.createElement("script");
        scriptInit.text = initMap;

        document.body.appendChild(scriptInit);
    }
    componentDidMount() {
        initMap(this.props.userCoords, this.props.openSpots);
    }
    componentWillReceiveProps(nextProps) {
        initMap(nextProps.userCoords, nextProps.openSpots);
    }


    // componentDidUpdate(prevProps, prevState) {
    //     var that = this;
    //     // Grab user location
    //     if (!navigator.geolocation) {
    //         return alert('Geolocation not supported by your browser!');
    //     }
    //     // locationButton.attr('disabled', 'disabled').text('Sending Location...');
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         // locationButton.removeAttr('disabled').text('Send Location');
    //         var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
    //
    //         // if (that.props === nextProps)
    //         initMap(userCoords, that.props.openSpots);
    //     });
    // }
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
            var obj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                id: uuid(),
                available: true,
                markedOpenAt: moment().unix(),
                markedClosedAt: undefined
            };

            var obj2 = {lat: 41.003, lng: -72.48502, address: '74 Peabody Pl, Brick City', available: true, zipCode: '10462'};
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