import React, {Component} from 'react';
import Nav from './Nav';
import Map from './Map';
import List from './List';

class MapView extends Component {
    constructor () {
        super();
        this.state = {
            locations: [{lat: 40.00, lng: -74.47}]
        };
        this.addLocation = this.addLocation.bind(this);
    }
    addLocation (objLocation) {
        var locationArrCopy = this.state.locations;
        locationArrCopy.push(objLocation);

        this.setState({
            locations: locationArrCopy
        });
    }
    render () {
        return (
            <div>
                <Nav/>
                <Map openSpots={this.state.locations} addLocation={this.addLocation}/>
                <List openSpots={this.state.locations}/>
            </div>
        );
    }
}

export default MapView;