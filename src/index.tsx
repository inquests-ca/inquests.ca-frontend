import React from 'react';
import ReactDOM from 'react-dom';

import App from 'common/components/App';
import { initializeAnalytics } from 'common/utils/analytics';
import * as serviceWorker from 'serviceWorker';

initializeAnalytics();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
