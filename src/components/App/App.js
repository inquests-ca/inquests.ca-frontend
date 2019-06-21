import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import ViewInquests from '../../scenes/ViewInquests';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Route path="/" component={ViewInquests} />
    </Router>
  );
}
