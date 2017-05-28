import React, {Component} from 'react';

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