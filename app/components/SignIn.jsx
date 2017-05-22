import React, {Component} from 'react';
import Nav from './Nav';

class SignIn extends Component {
    render () {
        return (
            <div>
                <div className="centered-form">
                    <Nav/>
                    <h1>Find a spot near you!</h1>
                    <div className="centered-form__form">
                        <form action="/mapview">
                            <div className="form-field">
                                <h3>Join a chat</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input type="text" name="name" autoFocus/>
                            </div>
                            <div className="form-field">
                                <label>Room name</label>
                                <input type="text" name="room"/>
                            </div>
                            <div className="form-field">
                                <button>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;