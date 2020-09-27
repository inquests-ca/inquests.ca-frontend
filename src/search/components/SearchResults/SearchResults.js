import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  layout: {
    padding: theme.spacing(4),
    minWidth: '100%'
  },
  noResults: {
    color: theme.palette.text.secondary
  },
  // TODO: center.
  pagination: {
    margin: theme.spacing(4)
  }
}));

export default function SearchResults(props) {
  const { className, children, count, page, pagination, onPageChange } = props;

  const handlePageChange = (_, newPage) => onPageChange(newPage);

  const classes = useStyles();

  if (count === 0)
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
          {count} {count === 1 ? 'Result' : 'Results'}
        </Typography>
        {children}
      </Paper>
      <Pagination
        className={classes.pagination}
        count={Math.ceil(count / pagination)}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}

SearchResults.propTypes = {
  children: PropTypes.array,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pagination: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
