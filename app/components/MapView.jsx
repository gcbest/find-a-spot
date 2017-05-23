import React, {Component} from 'react';
import Nav from './Nav';
import Map from './Map';
import List from './List';

import axios from 'axios';

// import addressFormatter from '../api/formatAddress';

class MapView extends Component {
    constructor () {
        super();
        this.state = {
            locations: [{lat: 40.00, lng: -74.47}],
            addresses: []
        };
        this.addLocation = this.addLocation.bind(this);
        this.addAddress = this.addAddress.bind(this);
    }
    addLocation (objLocation) {
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
    formatTheAddress (list) {
        var that = this;
        if (list.length > 0) {
            var arr = list.map((spot) => {
                var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${spot.lat},${spot.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
                return axios.get(url)
                    .then((response) => {
                        return (<li key={spot.lat}>{response.data.results[0].formatted_address}</li>);
                    })
                    .catch((error) => {
                        throw error;
                    });
            });
            Promise.all(arr).then((results) => {
                that.setState({
                    addresses: results
                });
            });
        }
    }
    render () {
        this.formatTheAddress(this.state.locations);
        return (
            <div>
                <Nav/>
                <Map openSpots={this.state.locations} addLocation={this.addLocation}/>
                <List addresses={this.state.addresses}/>
            </div>
        );
    }
}

export default MapView;