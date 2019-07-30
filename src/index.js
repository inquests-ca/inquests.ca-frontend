import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { init as initFirebase } from './common/services/firebase';
import App from './common/components/App';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';

initFirebase();

const store = configureStore({});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
