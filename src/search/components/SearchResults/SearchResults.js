import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  searchResults: {
    padding: theme.spacing(4),
    minWidth: '100%'
  },
  noResults: {
    color: theme.palette.text.secondary
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
      <Paper className={classes.searchResults}>{children}</Paper>
    </div>
  );
}
