import React, {Component} from 'react';

class List extends Component {
    constructor (props) {
        super(props)
    }
    displayList (list) {
        return list.map((spot) => {
            return <li key={spot.lat}>{spot.lat}</li>;
        });
    }
    render () {
        return (
            <div id="spots-list">
                <ul>
                    {this.displayList(this.props.openSpots)}
                </ul>
            </div>
        );
    }
}

export default List;