import React, {Component} from 'react';
import Nav from './Nav';

class MapView extends Component {
    render () {
        return (
            <div>
                {Nav}
                <div id="map">
                    <img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiro5XCioTUAhVB0xoKHRq8A38QjRwIBw&url=http%3A%2F%2Fgeology.com%2Fworld%2Fthe-united-states-of-america-satellite-image.shtml&psig=AFQjCNGua3VF_BKZxzfRiDgZ8J3kg4nDJQ&ust=1495562471189529" alt="I'm the map"/>
                </div>
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