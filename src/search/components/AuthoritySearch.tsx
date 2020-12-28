import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

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
import MultiSelect from 'common/components/MultiSelect';
import SingleSelect from 'common/components/SingleSelect';
import Box from 'common/components/Box';
import { fetchJson } from 'common/utils/request';
import { AuthorityCategory, Jurisdiction } from 'common/models';
import { MenuItem, SearchType } from 'common/types';
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
  keywordsBox: {
    padding: theme.spacing(2),
    display: 'grid',
    gridRowGap: theme.spacing(3),
  },
}));

interface AuthoritySearchProps {
  onQueryChange: (query: AuthorityQuery) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
}

const AuthoritySearch = ({ onQueryChange, onSearchTypeChange }: AuthoritySearchProps) => {
  const queryParams = useQueryParams<AuthorityQuery>(authorityQuerySchema);
  const query = { ...defaultAuthorityQuery(), ...queryParams };

  const { data: authorities } = useQuery(
    ['authorities', query],
    (_key: string, query: AuthorityQuery) => fetchAuthorities(query)
  );

  const { data: keywords } = useQuery('authorityKeywords', () =>
    fetchJson<AuthorityCategory[]>('/keywords/authority')
  );

  const { data: jurisdictions } = useQuery('jurisdictions', () =>
    fetchJson<Jurisdiction[]>('/jurisdictions')
  );

  const handleSortChange = (sort: Sort): void => onQueryChange({ ...query, sort });
  const handlePageChange = (page: number): void => onQueryChange({ ...query, page });
  const handleTextSearch = (text: string): void => onQueryChange({ ...query, page: 1, text });
  const handleKeywordsChange = (category: string, selectedKeywords: string[]): void =>
    onQueryChange({
      ...query,
      page: 1,
      keywords: { ...query.keywords, [category]: selectedKeywords },
    });
  const handleJurisdictionChange = (jurisdiction: string): void =>
    onQueryChange({ ...query, page: 1, jurisdiction });

  const classes = useStyles();

  const jurisdictionItems = jurisdictions?.map(
    (jurisdiction): MenuItem<string> => ({
      label: jurisdiction.name === 'Canada' ? 'Canada (federal)' : jurisdiction.name,
      value: jurisdiction.jurisdictionId,
    })
  );

  // TODO: prevent flicker after search by displaying previous search results.
  return (
    <div className={classes.layout}>
      <SearchMenu searchType={SearchType.Authority} onSearchTypeChange={onSearchTypeChange}>
        <SearchField
          defaultValue={query.text}
          onSearch={handleTextSearch}
          searchOnBlur
          label="Enter search terms"
          name="search"
        />
        <Box className={classes.keywordsBox} label="Keywords" loading={!keywords}>
          {keywords?.map((category, i) => (
            <MultiSelect
              key={i}
              items={category.authorityKeywords.map(
                (keyword): MenuItem<string> => ({
                  label: keyword.name,
                  value: keyword.authorityKeywordId,
                })
              )}
              selectedValues={query.keywords[category.authorityCategoryId] || []}
              onChange={(selectedKeywords) =>
                handleKeywordsChange(category.authorityCategoryId, selectedKeywords)
              }
              renderValues={(selected) =>
                selected.length > 1
                  ? `${selected.length} Keywords Selected`
                  : selected.length === 1
                  ? `${selected.length} Keyword Selected`
                  : undefined
              }
              label={category.name}
            />
          ))}
        </Box>
        <SingleSelect
          emptyItem
          items={jurisdictionItems ?? []}
          loading={!jurisdictionItems}
          selectedValue={query.jurisdiction}
          onChange={handleJurisdictionChange}
          label="Jurisdiction"
        />
      </SearchMenu>
      <SearchResults
        loading={!authorities}
        count={authorities?.count ?? 0}
        pagination={PAGINATION}
        sort={query.sort}
        page={query.page}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      >
        {authorities?.data.map((authority, i) => (
          <AuthoritySearchResult key={i} authority={authority} query={query} />
        ))}
      </SearchResults>
    </div>
  );
};

export default AuthoritySearch;
