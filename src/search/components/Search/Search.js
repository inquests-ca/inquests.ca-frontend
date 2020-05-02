import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import SearchMenu from '../SearchMenu';
import SearchResults from '../SearchResults';
import SearchResultAuthority from '../SearchResultAuthority';
import SearchResultInquest from '../SearchResultInquest';
import { fetchJson, encodeQueryData } from 'common/services/requestUtils';

const useStyles = makeStyles(theme => ({
  layout: {
    // TODO: better way of setting top margin.
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    // TODO: better way of setting height.
    height: '85vh'
  },
  searchMenu: {
    margin: theme.spacing(4),
    marginRight: 0
  },
  searchResults: {
    margin: theme.spacing(4),
    flexGrow: 1
  }
}));

export default function Search(props) {
  const [searchType, setSearchType] = useState('authority');
  const [inquests, setInquests] = useState(null);
  const [authorities, setAuthorities] = useState(null);

  const { className } = props;

  const handleSearchTypeChange = newSearchType => setSearchType(newSearchType);

  const handleAuthorityQueryChange = useCallback(keyword => {
    const fetchAuthorities = async () => {
      const response = await fetchJson(`/authorities${encodeQueryData({ keyword })}`);
      if (!response.error) setAuthorities(response.data);
    };
    fetchAuthorities();
  }, []);

  const handleInquestQueryChange = useCallback(keyword => {
    const fetchInquests = async () => {
      const response = await fetchJson(`/inquests${encodeQueryData({ keyword })}`);
      if (!response.error) setInquests(response.data);
    };
    fetchInquests();
  }, []);

  // TODO: try to reduce this kind of branching logic if possible. Consider refactoring to avoid this check.
  let searchResults;
  if (searchType === 'authority')
    searchResults =
      authorities &&
      authorities.map((authority, i) => <SearchResultAuthority key={i} authority={authority} />);
  else if (searchType === 'inquest')
    searchResults =
      inquests && inquests.map((inquest, i) => <SearchResultInquest key={i} inquest={inquest} />);

  const classes = useStyles();

  // TODO: add fetching indicator.
  return (
    <div className={clsx(className, classes.layout)}>
      <SearchMenu
        className={classes.searchMenu}
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
        onAuthorityQueryChange={handleAuthorityQueryChange}
        onInquestQueryChange={handleInquestQueryChange}
      />
      {searchResults && (
        <SearchResults className={classes.searchResults}>{searchResults}</SearchResults>
      )}
    </div>
  );
}
