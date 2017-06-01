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
            locations: [{lat: 40.8512023, lng: -73.8639,
                         address:'Dat Way, Trap, DuhNorf 80823',
                         zipCode: '',
                         available: true,
                         id: uuid(),
                         markedOpenAt: moment().unix(),
                         markedClosedAt: undefined}]
        };
        this.addLocation = this.addLocation.bind(this);
        this.addAddress = this.addAddress.bind(this);
    }
    addLocation(objLocation) {
        var locationArrCopy = this.state.locations;
        locationArrCopy.push(objLocation);

        this.setState({
            locations: locationArrCopy
        });
    }
    addAddress (newAddress){
        var addressCopy = this.state.addresses;
        addressCopy.push(newAddress);
        this.setState({
            addresses: addressCopy
        });
    }
    formatTheAddressArray(list) {
        var that = this;
        if (list.length > 0) {
            var arr = list.map((spot) => {
                var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${spot.lat},${spot.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
                return axios.get(url)
                    .then((response) => {
                        return (<li data-lat={spot.lat} key={spot.lat}>{response.data.results[0].formatted_address}</li>);
                    })
                    .catch((error) => {
                        throw error;
                    });
            });
            // var addressArr = formatAddress(list);
            // debugger;
            Promise.all(arr).then((results) => {
                that.setState({
                    addresses: results
                });
            });
        }
    }

    render () {
        // this.formatTheAddressArray(this.state.locations);
        return (
            <div>
                <Nav/>
                <Map openSpots={this.state.locations} addLocation={this.addLocation}/>
                <OpenSpotsList addresses={this.state.locations}/>
            </div>
        );
    }
}

export default MapView;