import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import LoadingPage from '../LoadingPage';
import NavMenu from '../NavMenu';
import AuthorityViewer from '../../../authorityViewer';
import SignIn from '../../../signIn';
import SignUp from '../../../signUp';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f9f9f9'
    },
    text: {
      link: '#2681db'
    }
  }
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  // Callback will be invoked upon sign-in, sign-out, and token expiration.
  firebase.auth().onIdTokenChanged(user => setIsSignedIn(user !== null));

  if (isSignedIn === null) return <LoadingPage />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavMenu isSignedIn={isSignedIn} />
        <Switch>
          <Route exact={true} path="/" component={AuthorityViewer} />
          {!isSignedIn && <Route path="/signup" component={SignUp} />}
          {!isSignedIn && <Route path="/signin" component={SignIn} />}
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
