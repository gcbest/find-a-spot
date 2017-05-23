import React, {Component} from 'react';
import Nav from './Nav';
import Map from './Map';

class MapView extends Component {
    constructor () {
        super();
        this.state = {
            locations: []
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
                {Nav}
                <Map openSpots={this.state.locations} addLocation={this.addLocation}/>
                <div id="list">
                    List
                    <ul>
                        <li>672 Macon St</li>
                        <li>801 Neill Ave</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MapView;