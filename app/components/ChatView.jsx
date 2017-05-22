import React, {Component} from 'react';
import Nav from './Nav';

class ChatView extends Component {
    render () {
        return (
            <div>
                <Nav/>
                <div className="chat__sidebar">
                    <h3>People</h3>
                    {/*<div id="users"></div>*/}
                </div>
                <div className="chat__main">
                    {/*<ol id="messages" className="chat__messages"></ol>*/}
                    <div className="chat__footer">
                        <form action="" id="message-form">
                            <input name="message" type="text" placeholder="Message" autoFocus autoComplete="off" />
                            <button>Send</button>
                        </form>
                        <button id="send-location">Send Location</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatView;