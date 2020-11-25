import React, { useState } from 'react';

import AuthoritySearch from './AuthoritySearch';
import InquestSearch from './InquestSearch';
import { defaultAuthorityQuery, defaultInquestQuery } from 'search/utils/api';
import { AuthorityOrInquest } from 'common/types';

const Search = () => {
  const [searchType, setSearchType] = useState<AuthorityOrInquest>('authority');
  const [authorityQuery, setAuthorityQuery] = useState(defaultAuthorityQuery());
  const [inquestQuery, setInquestQuery] = useState(defaultInquestQuery());

  switch (searchType) {
    case 'authority':
      return (
        <AuthoritySearch
          query={authorityQuery}
          onQueryChange={setAuthorityQuery}
          onSearchTypeChange={setSearchType}
        />
      );
    case 'inquest':
      return (
        <InquestSearch
          query={inquestQuery}
          onQueryChange={setInquestQuery}
          onSearchTypeChange={setSearchType}
        />
      );
  }
};

export default Search;
