import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoadingPage from '../LoadingPage';
import NavMenu from '../NavMenu';
import SignIn from '../../../signIn';
import SignUp from '../../../signUp';
import ViewInquests from '../../../viewInquests';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  // Callback will be invoked upon sign-in, sign-out, and token expiration.
  firebase.auth().onIdTokenChanged(user => setIsSignedIn(user !== null));

  if (isSignedIn === null) return <LoadingPage />;

  return (
    <Router>
      <CssBaseline />
      <NavMenu isSignedIn={isSignedIn} />
      <Route exact={true} path="/" component={ViewInquests} />
      {!isSignedIn && <Route path="/signup" component={SignUp} />}
      {!isSignedIn && <Route path="/signin" component={SignIn} />}
      {isSignedIn && <Route path="/" render={() => <Redirect to="/" />} />}
    </Router>
  );
}
