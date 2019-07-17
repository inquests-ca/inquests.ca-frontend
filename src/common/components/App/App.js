import React, { useState, useEffect } from 'react';
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
import NavHeader from '../NavHeader';
import AuthorityViewer from '../../../authorityViewer';
import AuthorityCreator from '../../../authorityEditor';
import SignIn from '../../../signIn';
import SignUp from '../../../signUp';
import { subscribeIdTokenChangeEvent } from '../../services/firebase';

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
  const [currentUser, setCurrentUser] = useState(undefined);
  const adminAuthorization =
    currentUser && currentUser.authorization === 'admin';

  const handleIdTokenChange = user => setCurrentUser(user);

  useEffect(() => {
    const unsubscribe = subscribeIdTokenChangeEvent(handleIdTokenChange);
    return unsubscribe;
  }, []);

  if (currentUser === undefined) return <LoadingPage />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavHeader currentUser={currentUser} />
        <Switch>
          <Route exact={true} path="/" component={AuthorityViewer} />
          {!currentUser && <Route path="/signup" component={SignUp} />}
          {!currentUser && <Route path="/signin" component={SignIn} />}
          {adminAuthorization && (
            <Route
              path="/create"
              render={() => <AuthorityCreator currentUser={currentUser} />}
            />
          )}
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
