import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  layout: {
    padding: theme.spacing(1)
  },
  noResults: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic'
  }
}));

export default function SearchResults(props) {
  const { className, children } = props;

  const classes = useStyles();

  if (!children.length)
    return (
      <div className={className}>
        <Typography className={classes.noResults} variant="h5" component="span">
          No Results
        </Typography>
      </div>
    );

  // TODO: consider adding header such as "X results".
  return (
    <div className={className}>
      <Paper className={classes.layout}>{children}</Paper>}
    </div>
  );
}
