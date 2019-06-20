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
  },
  subtitle: {
    marginTop: theme.spacing(2)
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.layout}>
        <Typography variant="h1">Inquests.ca</Typography>
        <Typography variant="h6" className={classes.subtitle}>
          The guide to Canadian inquest authorities
        </Typography>
        <InquestTable />
      </div>
    </Container>
  );
}
