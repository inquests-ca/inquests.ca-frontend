import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  },
  title: {
    marginTop: theme.spacing(8)
  },
  progress: {
    marginTop: theme.spacing(4)
  }
}));

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.layout}>
      <CssBaseline />
      <Typography className={classes.title} variant="h2">
        Loading...
      </Typography>
      <CircularProgress className={classes.progress} />
    </Paper>
  );
}
