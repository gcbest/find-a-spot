import React, {Component} from 'react';

class OpenSpot extends Component {
    render () {

        return (
            <div id="open-spot">
                <li>
                    <p>Address</p>
                    <p>Created At</p>
                    <button>I parked at this spot!</button>
                </li>
            </div>
        );
    }
}

export default OpenSpot;