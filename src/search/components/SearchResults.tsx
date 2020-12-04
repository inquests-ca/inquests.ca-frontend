import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: theme.spacing(4),
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
  noResults: {
    color: theme.palette.text.secondary,
  },
  pagination: {
    marginTop: theme.spacing(2),
    justifySelf: 'center',
  },
}));

interface SearchResultsProps {
  children: React.ReactNode;
  count: number;
  page: number;
  pagination: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const SearchResults = ({
  children,
  count,
  page,
  pagination,
  onPageChange,
  className,
}: SearchResultsProps) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) =>
    onPageChange(newPage);

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
    <Paper className={clsx(className, classes.layout)}>
      <Typography variant="h5" component="span">
        {count} {count === 1 ? 'Result' : 'Results'}
      </Typography>
      {children}
      <Pagination
        className={classes.pagination}
        count={Math.ceil(count / pagination)}
        page={page}
        onChange={handlePageChange}
      />
    </Paper>
  );
};

export default SearchResults;
