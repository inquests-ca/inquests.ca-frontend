import React from 'react';
import ReactDOM from 'react-dom';

import './config.js';
import { init as initFirebase } from './common/services/firebase';
import App from './common/components/App';
import * as serviceWorker from './serviceWorker';

initFirebase();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
