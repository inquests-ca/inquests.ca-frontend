import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import AuthoritySearchResult from './AuthoritySearchResult';
import {
  Sort,
  AuthorityQuery,
  defaultAuthorityQuery,
  authorityQuerySchema,
  fetchAuthorities,
} from '../utils/api';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import { fetchJson } from 'common/utils/request';
import { AuthorityCategory } from 'common/models';
import { SearchType } from 'common/types';
import { PAGINATION } from 'common/constants';
import useQueryParams from 'common/hooks/useQueryParams';

const useStyles = makeStyles((theme) => ({
  layout: {
    margin: theme.spacing(4),
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gridColumnGap: theme.spacing(4),
    alignItems: 'start',
  },
  loading: {
    alignSelf: 'center',
    justifySelf: 'center',
  },
}));

interface AuthoritySearchProps {
  onQueryChange: (query: AuthorityQuery) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
}

const AuthoritySearch = ({ onQueryChange, onSearchTypeChange }: AuthoritySearchProps) => {
  const queryParams = useQueryParams<AuthorityQuery>(authorityQuerySchema);
  const query = { ...defaultAuthorityQuery(), ...queryParams };

  const { data: keywords } = useQuery('authorityKeywords', () =>
    fetchJson<AuthorityCategory[]>('/keywords/authority')
  );

  const { data: authorities } = useQuery(
    ['authorities', query],
    (_key: string, query: AuthorityQuery) => fetchAuthorities(query)
  );

  const handleSortChange = (sort: Sort): void => onQueryChange({ ...query, sort });
  const handlePageChange = (page: number): void => onQueryChange({ ...query, page });
  const handleTextSearch = (text: string): void => onQueryChange({ ...query, page: 1, text });
  const handleKeywordsSelect = (selectedKeywords: string[]): void =>
    onQueryChange({ ...query, page: 1, keywords: selectedKeywords });

  const classes = useStyles();

  const keywordOptions = keywords?.map((keywordCategory) => ({
    label: keywordCategory.name,
    options: keywordCategory.authorityKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.authorityKeywordId,
    })),
  }));

  // TODO: prevent flicker after search by displaying previous search results.
  return (
    <div className={classes.layout}>
      <SearchMenu searchType={SearchType.Authority} onSearchTypeChange={onSearchTypeChange}>
        <SearchField
          defaultValue={query.text}
          onSearch={handleTextSearch}
          label="Search Authorities"
          name="search"
        />
        {
          <NestedMultiSelect
            options={keywordOptions ?? []}
            loading={!keywordOptions}
            defaultValues={query.keywords}
            onSelect={handleKeywordsSelect}
            renderLabel={(selected) =>
              selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
            }
          />
        }
      </SearchMenu>
      {authorities ? (
        <SearchResults
          count={authorities.count}
          pagination={PAGINATION}
          sort={query.sort}
          page={query.page}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
        >
          {authorities.data.map((authority, i) => (
            <AuthoritySearchResult key={i} authority={authority} />
          ))}
        </SearchResults>
      ) : (
        <CircularProgress className={classes.loading} />
      )}
    </div>
  );
};

export default AuthoritySearch;
