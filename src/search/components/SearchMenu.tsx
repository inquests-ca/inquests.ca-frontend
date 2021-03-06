import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import RadioButtons from 'common/components/RadioButtons';
import { SearchType } from 'common/types';

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: theme.spacing(4),
    minHeight: `calc(100vh - ${theme.spacing(8)}px - 64px)`,
    display: 'grid',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(3),
  },
}));

interface SearchMenuProps {
  searchType: SearchType;
  onSearchTypeChange: (searchType: SearchType) => void;
  onSearchClear: () => void;
  children: React.ReactNode;
  className?: string;
}

const SearchMenu = ({
  searchType,
  onSearchTypeChange,
  onSearchClear,
  children,
  className,
}: SearchMenuProps) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(className, classes.layout)}>
      <RadioButtons
        items={[
          { value: SearchType.Authority, label: 'Authorities' },
          { value: SearchType.Inquest, label: 'Inquests' },
        ]}
        selectedValue={searchType}
        onChange={onSearchTypeChange}
      ></RadioButtons>
      {children}
      <Button variant="contained" onClick={onSearchClear}>
        Clear Search
      </Button>
    </Paper>
  );
};

export default SearchMenu;
