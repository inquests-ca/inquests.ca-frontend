import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Search from 'search';
import NavHeader from 'common/components/NavHeader';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavHeader />
        <Switch>
          <Route exact={true} path="/" component={Search} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
