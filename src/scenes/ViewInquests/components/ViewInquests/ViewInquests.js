import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import InquestTable from '../InquestTable';

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  subtitle: {
    marginTop: theme.spacing(2)
  },
  table: {
    marginTop: theme.spacing(4)
  }
}));

export default function ViewInquests() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.layout}>
        <Typography variant="h1">Inquests.ca</Typography>
        <Typography variant="h6" className={classes.subtitle}>
          The guide to Canadian inquest authorities
        </Typography>
        <div className={classes.table}>
          <InquestTable />
        </div>
      </div>
    </Container>
  );
}
