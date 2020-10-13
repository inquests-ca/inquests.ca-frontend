import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { AuthoritySearch, InquestSearch } from 'search';
import NavHeader from 'common/components/NavHeader';
import { ViewAuthority, ViewInquest } from 'view';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f9f9f9',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <NavHeader />
      <Switch>
        <Route exact={true} path="/authorities" component={AuthoritySearch} />
        <Route exact={true} path="/inquests" component={InquestSearch} />
        <Route path="/authority/:authorityId" component={ViewAuthority} />
        <Route path="/inquest/:inquestId" component={ViewInquest} />
        <Redirect to="/authorities" />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
