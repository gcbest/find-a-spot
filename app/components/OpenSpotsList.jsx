import React, {Component} from 'react';
import OpenSpot from './OpenSpot';

class OpenSpotsList extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        var {addresses} = this.props;
        var renderOpenSpots = () => {
            if (addresses.length === 0) {
                return <p>No Open Spots Available</p>;
            }

            return addresses.map((spot) => {
                return (
                    <OpenSpot key={spot.lat} {...spot} updateAvailability={this.props.updateAvailability} userCoords={this.props.userCoords}/>
                );
            });
        };
        return (
            <div id="spots-list">
                <ul>
                    {renderOpenSpots()}
                </ul>
            </div>
        );
    }
}

export default OpenSpotsList;