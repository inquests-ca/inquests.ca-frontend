import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import SingleSelect from 'common/components/SingleSelect';
import { Sort } from 'search/utils/api';

const useStyles = makeStyles((theme) => ({
  layout: {
    height: '100%',
    padding: theme.spacing(4),
    display: 'grid',
    gridRowGap: theme.spacing(2),
    gridAutoRows: 'min-content',
  },
  toolbarLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  sort: {
    width: '7rem',
  },
  noResults: {
    color: theme.palette.text.secondary,
  },
  loading: {
    // Centers loading icon.
    marginTop: '20%',
    justifySelf: 'center',
  },
  pagination: {
    marginTop: theme.spacing(2),
    justifySelf: 'center',
  },
}));

interface SearchResultsProps {
  children: React.ReactNode;
  loading?: boolean;
  count: number;
  sort: Sort;
  page: number;
  pagination: number;
  onSortChange: (sort: Sort) => void;
  onPageChange: (page: number) => void;
  className?: string;
}

const SearchResults = ({
  children,
  loading,
  count,
  page,
  pagination,
  sort,
  onPageChange,
  onSortChange,
  className,
}: SearchResultsProps) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) =>
    onPageChange(newPage);

  const classes = useStyles();

  if (!loading && count === 0)
    return (
      <div className={className}>
        <Typography className={classes.noResults} variant="h5" component="span">
          No Results
        </Typography>
      </div>
    );

  return (
    <Paper className={clsx(className, classes.layout)}>
      <div className={classes.toolbarLayout}>
        <span>
          <SingleSelect
            items={[
              { value: Sort.Relevant, label: 'Relevance' },
              { value: Sort.New, label: 'Newest' },
              { value: Sort.Alphabetical, label: 'A-Z' },
            ]}
            selectedValue={sort}
            onChange={onSortChange}
            label="Sort by"
            className={classes.sort}
          ></SingleSelect>
        </span>
        {!loading && (
          <Typography variant="h5" component="span">
            {count} {count === 1 ? 'Result' : 'Results'}
          </Typography>
        )}
      </div>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {children}
          <Pagination
            className={classes.pagination}
            count={Math.ceil(count / pagination)}
            page={page}
            onChange={handlePageChange}
          />
        </>
      )}
    </Paper>
  );
};

export default SearchResults;
