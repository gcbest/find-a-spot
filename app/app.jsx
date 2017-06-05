import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

import Main from './components/Main';

// Load foundation
require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

require('style-loader!css-loader!./styles/app.css');

ReactDOM.render(
        <Router history={customHistory}>
            <Main/>
        </Router>,
    document.getElementById('app')
);

