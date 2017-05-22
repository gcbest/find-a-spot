import React, {Component} from 'react';
import Nav from './Nav';

class ChatView extends Component {
    render () {
        return (
            <div>
                {Nav}
                <div>
                    Chat Messages
                </div>
            </div>
        );
    }
}

export default ChatView;