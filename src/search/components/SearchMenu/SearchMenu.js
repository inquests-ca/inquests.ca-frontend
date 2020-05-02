import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchAuthorities from '../SearchAuthorities';
import SearchInquests from '../SearchInquests';
import RadioButtons from 'common/components/RadioButtons';
import { fetchJson } from 'common/services/requestUtils';

const useStyles = makeStyles(theme => ({
  layout: {
    // Using the width property does not work here.
    minWidth: 300,
    maxWidth: 300,
    padding: theme.spacing(4)
  },
  searchComponent: {
    marginBottom: theme.spacing(4)
  }
}));

export default function SearchMenu(props) {
  // TODO: add fetching indicator.
  const [inquestKeywords, setInquestKeywords] = useState(null);
  const [authorityKeywords, setAuthorityKeywords] = useState(null);

  const {
    className,
    searchType,
    onSearchTypeChange,
    onAuthorityQueryChange,
    onInquestQueryChange
  } = props;

  useEffect(() => {
    const fetchInquestKeywords = async () => {
      const response = await fetchJson('/inquestKeywords');
      if (!response.error) setInquestKeywords(response.data);
    };
    const fetchAuthorityKeywords = async () => {
      const response = await fetchJson('/authorityKeywords');
      if (!response.error) setAuthorityKeywords(response.data);
    };

    fetchInquestKeywords();
    fetchAuthorityKeywords();
  }, []);

  const searchTypeItems = [
    { label: 'Authorities', value: 'authority' },
    { label: 'Inquests', value: 'inquest' }
  ];

  const classes = useStyles();

  // TODO: divider between Radio Buttons and MultiSelect.
  // TODO: refactor if possible to avoid branching logic at multiple different component levels.
  return (
    <Paper className={clsx(className, classes.layout)}>
      <RadioButtons
        className={classes.searchComponent}
        items={searchTypeItems}
        selectedValue={searchType}
        onChange={onSearchTypeChange}
        label="Search for"
      />
      {searchType === 'authority' && (
        <SearchAuthorities keywords={authorityKeywords} onQueryChange={onAuthorityQueryChange} />
      )}
      {searchType === 'inquest' && (
        <SearchInquests keywords={inquestKeywords} onQueryChange={onInquestQueryChange} />
      )}
    </Paper>
  );
}
