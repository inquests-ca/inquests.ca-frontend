import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
  },
}));

const LoadingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
