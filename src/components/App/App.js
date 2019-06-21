import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavMenu from '../NavMenu';
import ViewInquests from '../../scenes/ViewInquests';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <NavMenu />
      <Route path="/" component={ViewInquests} />
    </Router>
  );
}
