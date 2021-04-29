import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Homepage from 'home';
import { About, Legal } from 'static';
import Search from 'search';
import NavHeader from 'common/components/Header';
import { ViewAuthority, ViewInquest } from 'view';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f9f9f9',
    },
  },
});

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <NavHeader />
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/about" component={About} />
          <Route exact={true} path="/legal" component={Legal} />
          <Route path="/search" component={Search} />
          <Route path="/authority/:authorityId" component={ViewAuthority} />
          <Route path="/inquest/:inquestId" component={ViewInquest} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  </ThemeProvider>
);

export default App;
