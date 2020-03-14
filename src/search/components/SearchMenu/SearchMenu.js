import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchAuthorities from '../SearchAuthorities';
import SearchInquests from '../SearchInquests';
import RadioButtons from '../../../common/components/RadioButtons';

const useStyles = makeStyles(theme => ({
  layout: {
    minWidth: 300,
    maxWith: 350,
    padding: theme.spacing(4)
  },
  searchComponent: {
    marginBottom: theme.spacing(4)
  }
}));

export default function SearchMenu(props) {
  const { className, searchType, onSearchTypeChange, onQueryChange } = props;

  const handleSearchTypeChange = newSearchType => onSearchTypeChange(newSearchType);

  // TODO: consts for search type.
  const searchTypeItems = [
    {
      label: 'Authorities',
      value: 'authority'
    },
    {
      label: 'Inquests',
      value: 'inquest'
    }
  ];

  const classes = useStyles();

  // TODO: divider between Radio Buttons and MultiSelect.
  return (
    <Paper className={clsx(className, classes.layout)}>
      <RadioButtons
        className={classes.searchComponent}
        items={searchTypeItems}
        selectedValue={searchType}
        onChange={handleSearchTypeChange}
        label="Search for"
      />
      {searchType === 'authority' && <SearchAuthorities onQueryChange={onQueryChange} />}
      {searchType === 'inquest' && <SearchInquests onQueryChange={onQueryChange} />}
    </Paper>
  );
}
