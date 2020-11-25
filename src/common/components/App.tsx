import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Search from 'search';
import NavHeader from 'common/components/NavHeader';
import { ViewAuthority, ViewInquest } from 'view';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f9f9f9',
    },
  },
});

// TODO: adjust defaults.
const queryCache = new QueryCache();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <NavHeader />
        <Switch>
          <Route exact={true} path="/search" component={Search} />
          <Route path="/authority/:authorityId" component={ViewAuthority} />
          <Route path="/inquest/:inquestId" component={ViewInquest} />
          <Redirect to="/authorities" />
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  </ThemeProvider>
);

export default App;
