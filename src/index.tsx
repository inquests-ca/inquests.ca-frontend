import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from 'common/components/App';
import * as serviceWorker from 'serviceWorker';

// Initialize Google Analytics
ReactGA.initialize('G-TZ819ZFX2X');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
