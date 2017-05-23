import React, {Component} from 'react';

var initMap = require('../api/googlemaps');

class Map extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        const scriptInit = document.createElement("script");
        scriptInit.text = initMap;


        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s&callback=initMap";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
        document.body.appendChild(scriptInit);

    }
    componentDidUpdate () {
        // initMap(this.props.openSpots[0], this.props.openSpots[0]);
    }
    // componentWillReceiveProps (nextProps) {
    //     debugger;
    //     this.displayList(this.props.openSpots);
    //     // this.displayList(this.nextProps.openSpots);
    // }
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
            var obj = {lat: position.coords.latitude, lng: position.coords.longitude};
            var obj2 = {lat: 41.003, lng: -72.48502};
            that.props.addLocation(obj);
            that.props.addLocation(obj2);
            initMap(obj, that.props.openSpots);
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