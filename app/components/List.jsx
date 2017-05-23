import React, {Component} from 'react';
import axios from 'axios';

class List extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div id="spots-list">
                <ul>
                    {this.props.addresses}
                </ul>
            </div>
        );
    }
}

export default List;