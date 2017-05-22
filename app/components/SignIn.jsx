import React, {Component} from 'react';
import Nav from './Nav';

class SignIn extends Component {
    render () {
        return (
            <div>
                <Nav/>
                <p>Find a spot near you!</p>
                <br/>
                <form>
                    <input type="text" ref="username" placeholder="username"/>
                    <button id="submit">Enter your local chat room</button>
                </form>
            </div>
        );
    }
}

export default SignIn;