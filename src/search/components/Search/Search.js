import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import SearchMenu from '../SearchMenu';
import SearchResults from '../SearchResults';
import SearchResultAuthority from '../SearchResultAuthority';
import SearchResultInquest from '../SearchResultInquest';
import { getAuthorities } from '../../../common/services/authorityApi';
import { getInquests } from '../../../common/services/inquestApi';

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
  const [query, setQuery] = useState({});
  const [inquests, setInquests] = useState(null);
  const [authorities, setAuthorities] = useState(null);

  const { className } = props;

  useEffect(() => {
    const fetchAuthorities = async () => {
      const response = await getAuthorities(query);
      if (!response.error) setAuthorities(response.data);
    };
    fetchAuthorities();
  }, [query]);

  useEffect(() => {
    const fetchInquests = async () => {
      const response = await getInquests(query);
      if (!response.error) setInquests(response.data);
    };
    fetchInquests();
  }, [query]);

  const handleSearchTypeChange = newSearchType => {
    setSearchType(newSearchType);
    setQuery({});
  };
  const handleQueryChange = newQuery => setQuery(newQuery);

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
        onQueryChange={handleQueryChange}
      />
      {searchResults && (
        <SearchResults className={classes.searchResults}>{searchResults}</SearchResults>
      )}
    </div>
  );
}
