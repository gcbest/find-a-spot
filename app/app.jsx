import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn';
import MapView from './components/MapView'
import ChatView from './components/ChatView';

// Load foundation
require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

require('style-loader!css-loader!./styles/app.css');

ReactDOM.render(
    <Main>
        <Router>
            <Switch>
                    <Route exact path="/" component={SignIn}/>
                    <Route path="/mapview/:id" component={MapView}/>
            </Switch>
        </Router>
    </Main>,
    document.getElementById('app')
);

