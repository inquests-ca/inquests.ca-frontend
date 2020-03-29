import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  layout: {
    padding: theme.spacing(1)
  }
}));

export default function SearchResults(props) {
  const { className, children } = props;

  const classes = useStyles();

  // TODO: consider adding header such as "X results".
  // TODO: display no results.
  return (
    <div className={className}>
      {children && <Paper className={classes.layout}>{children}</Paper>}
    </div>
  );
}
