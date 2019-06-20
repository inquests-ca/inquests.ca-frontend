import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import InquestTable from '../InquestTable';

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.layout}>
        <Typography variant="h1">Inquests.ca</Typography>
        <InquestTable />
      </div>
    </Container>
  );
}
