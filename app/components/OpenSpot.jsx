import React, {Component} from 'react';
import moment from 'moment';

class OpenSpot extends Component {
    handleClick(id) {
        // var updateAvailability = this.props.updateAvailability;
        // updateAvailability(id);
    }
    render() {
        var {address, markedOpenAt, available, id, markedClosedAt} = this.props;
        this.handleClick = this.handleClick.bind(this);
        var renderSpot = () => {
            if (available) {
               return (
                   <li>
                       <p>{address}</p>
                       <p>{moment.unix(markedOpenAt).format('MMM Do YYYY @ h:mm a')}</p>
                       <button onClick={() => {
                           this.props.updateAvailability(id);
                       }}>I parked at this spot!</button>
                   </li>
               );
            }
        };
        return (
            <div id="open-spot">
                {renderSpot()}
            </div>
        );
    }
}

export default OpenSpot;

// pass address info down to open spot
// return an array of open spots components in list
//