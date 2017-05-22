import React, {Component} from 'react';
import Nav from './Nav';

class Map extends Component {
    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
    }
    render () {
        return (
            <div>
                Map
            </div>
        );
    }
}
