import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  layout: {
    padding: theme.spacing(4),
    minWidth: '100%'
  },
  noResults: {
    color: theme.palette.text.secondary
  }
}));

export default function SearchResults(props) {
  const { className, children, count } = props;

  const classes = useStyles();

  if (!children.length)
    return (
      <div className={className}>
        <Typography className={classes.noResults} variant="h5" component="span">
          No Results
        </Typography>
      </div>
    );

  return (
    <div className={className}>
      <Paper className={classes.layout}>
        <Typography variant="h5" component="span">
          {count} Results
        </Typography>
        {children}
      </Paper>
    </div>
  );
}
