import axios from 'axios';
import uuid from 'node-uuid';
import moment from 'moment';

import React, {Component} from 'react';
import Nav from './Nav';
import Map from './Map';
import OpenSpotsList from './OpenSpotsList';

var {formatAddress} = require('../api/formatAddress');

class MapView extends Component {
    constructor () {
        super();
        this.state = {
            // locations: [{lat: 40.8512023, lng: -73.8639,
            //              address:'Dat Way, Trap, DuhNorf 80823',
            //              zipCode: '',
            //              available: true,
            //              id: uuid(),
            //              markedOpenAt: moment().unix(),
            //              markedClosedAt: undefined}]
            locations: [],
        };

        var that = this;

        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            that.state.userCoords = userCoords;

            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCoords.lat},${userCoords.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
            axios.get(url)
                .then((response) => {
                    that.state.zipCode = response.data.results[0].address_components[7].long_name;
                })
                .catch((error) => {
                    throw error;
                });
        });


        this.addLocation = this.addLocation.bind(this);
        this.updateAvailability = this.updateAvailability.bind(this);
    }
    addLocation(objLocation) {
        var locationsArrCopy = this.state.locations;
        locationsArrCopy.push(objLocation);

        this.setState({
            locations: locationsArrCopy
        });
    }
    updateAvailability(id) {
        var locationsArrCopy = this.state.locations.map((spot) => {
           if (spot.id === id) {
               var isAvailable = !spot.available;
               spot.available = isAvailable;
           }
           return spot;
        });
        this.setState({
            locations: locationsArrCopy
        });
    }
    /**** Returning an array of promises ****/
    // formatTheAddressArray(list) {
    //     var that = this;
    //     if (list.length > 0) {
    //         var arr = list.map((spot) => {
    //             var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${spot.lat},${spot.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
    //             return axios.get(url)
    //                 .then((response) => {
    //                     return (<li data-lat={spot.lat} key={spot.lat}>{response.data.results[0].formatted_address}</li>);
    //                 })
    //                 .catch((error) => {
    //                     throw error;
    //                 });
    //         });
    //         Promise.all(arr).then((results) => {
    //             that.setState({
    //                 addresses: results
    //             });
    //         });
    //     }
    // }

    render () {
        var locationsArrCopy = this.state.locations;
        locationsArrCopy = locationsArrCopy.filter((spot) => {
            return spot.available && spot.zipCode === this.state.zipCode;
        });
        return (
            <div>
                <Nav/>
                <Map openSpots={locationsArrCopy} addLocation={this.addLocation}/>
                <OpenSpotsList addresses={locationsArrCopy} updateAvailability={this.updateAvailability}/>
            </div>
        );
    }
}

export default MapView;