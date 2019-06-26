import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavMenu from '../NavMenu';
import SignIn from '../../scenes/SignIn';
import SignUp from '../../scenes/SignUp';
import ViewInquests from '../../scenes/ViewInquests';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Callback will be invoked upon sign-in, sign-out, and token expiration.
  firebase.auth().onIdTokenChanged(user => setIsSignedIn(user !== null));

  return (
    <Router>
      <CssBaseline />
      <NavMenu isSignedIn={isSignedIn} />
      <Route exact={true} path="/" component={ViewInquests} />
      <Route
        path="/signup"
        render={() => {
          if (isSignedIn) return <Redirect to="/" />;
          else return <SignUp />;
        }}
      />
      <Route
        path="/signin"
        component={() => {
          if (isSignedIn) return <Redirect to="/" />;
          else return <SignIn />;
        }}
      />
    </Router>
  );
}
