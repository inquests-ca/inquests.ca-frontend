import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import SingleSelect from 'common/components/SingleSelect';
import { Sort } from 'search/utils/api';

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: theme.spacing(4),
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
  topLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  sort: Sort;
  page: number;
  pagination: number;
  onSortChange: (sort: Sort) => void;
  onPageChange: (page: number) => void;
  className?: string;
}

const SearchResults = ({
  children,
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

  if (count === 0)
    return (
      <div className={className}>
        <Typography className={classes.noResults} variant="h5" component="span">
          No Results
        </Typography>
      </div>
    );

  // TODO: show sort component while results are loading.
  return (
    <Paper className={clsx(className, classes.layout)}>
      <div className={classes.topLayout}>
        <Typography variant="h5" component="span">
          {count} {count === 1 ? 'Result' : 'Results'}
        </Typography>
        <SingleSelect
          items={[
            { value: Sort.Relevant, label: 'Relevant' },
            { value: Sort.New, label: 'Newest' },
            { value: Sort.Alphabetical, label: 'A-Z' },
          ]}
          selectedValue={sort}
          onChange={(sort: string) => onSortChange(sort as Sort)}
        ></SingleSelect>
      </div>
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
