import React, {Component} from 'react';
import OpenSpot from './OpenSpot';

class OpenSpotsList extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div id="spots-list">
                <ul>
                    {this.props.addresses.address}
                </ul>
            </div>
        );
    }
}

export default OpenSpotsList;