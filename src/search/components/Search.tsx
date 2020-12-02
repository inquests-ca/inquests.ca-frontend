import React from 'react';
import { useHistory } from 'react-router-dom';
import joi from 'joi';

import AuthoritySearch from './AuthoritySearch';
import InquestSearch from './InquestSearch';
import { AuthorityQuery, InquestQuery } from 'search/utils/api';
import { SearchType } from 'common/types';
import useQueryParams from 'common/hooks/useQueryParams';
import { stringifyQuery } from 'common/utils/request';

const Search = () => {
  // Parse 'type' query parameter to determine whether to render authority- or inquest-search.
  const query = useQueryParams<{ type: SearchType }>(
    joi.object({ type: joi.string().valid('authority', 'inquest') })
  );
  const searchType: SearchType = (query && query.type) || 'authority';

  const history = useHistory();

  const handleQueryChange = (query: AuthorityQuery | InquestQuery) => {
    history.push(`/search${stringifyQuery({ type: searchType, ...query }, { encode: false })}`);
  };

  const handleSearchTypeChange = (searchType: SearchType) => {
    history.push(`/search${stringifyQuery({ type: searchType }, { encode: false })}`);
  };

  switch (searchType) {
    case 'authority':
      return (
        <AuthoritySearch
          onQueryChange={handleQueryChange}
          onSearchTypeChange={handleSearchTypeChange}
        />
      );
    case 'inquest':
      return (
        <InquestSearch
          onQueryChange={handleQueryChange}
          onSearchTypeChange={handleSearchTypeChange}
        />
      );
  }
};

export default Search;
