import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import InquestSearchResult from './InquestSearchResult';
import {
  Sort,
  InquestQuery,
  inquestQuerySchema,
  defaultInquestQuery,
  fetchInquests,
} from '../utils/api';
import SearchField from 'common/components/SearchField';
import MultiSelect from 'common/components/MultiSelect';
import SingleSelect from 'common/components/SingleSelect';
import Box from 'common/components/Box';
import { fetchJson } from 'common/utils/request';
import { InquestCategory, Jurisdiction, DeathCause } from 'common/models';
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

interface InquestSearchProps {
  onQueryChange: (query: InquestQuery) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
}

const InquestSearch = ({ onQueryChange, onSearchTypeChange }: InquestSearchProps) => {
  const queryParams = useQueryParams<InquestQuery>(inquestQuerySchema);
  const query = { ...defaultInquestQuery(), ...queryParams };

  const { data: inquests } = useQuery(['inquests', query], (_key: string, query: InquestQuery) =>
    fetchInquests(query)
  );

  const { data: keywords } = useQuery('inquestKeywords', () =>
    fetchJson<InquestCategory[]>('/keywords/inquest')
  );

  const { data: deathCauses } = useQuery('deathCauses', () =>
    fetchJson<DeathCause[]>('/deathCauses')
  );

  const { data: jurisdictions } = useQuery('jurisdictions', () =>
    fetchJson<Jurisdiction[]>('/jurisdictions')
  );

  const handleSortChange = (sort: Sort): void => onQueryChange({ ...query, sort });
  const handlePageChange = (page: number): void => onQueryChange({ ...query, page });
  const handleTextSearch = (text: string): void => onQueryChange({ ...query, page: 1, text });
  const handleDeathCauseChange = (deathCause: string): void =>
    onQueryChange({ ...query, page: 1, deathCause });
  const handleKeywordsChange = (category: string, selectedKeywords: string[]): void =>
    onQueryChange({
      ...query,
      page: 1,
      keywords: { ...query.keywords, [category]: selectedKeywords },
    });
  const handleJurisdictionChange = (jurisdiction: string): void =>
    onQueryChange({ ...query, page: 1, jurisdiction });
  const handleSearchClear = () =>
    !_.isEqual(query, defaultInquestQuery()) ? onQueryChange(defaultInquestQuery()) : undefined;

  const classes = useStyles();

  const deathCauseItems = deathCauses?.map(
    (deathCause): MenuItem<string> => ({
      label: deathCause.name,
      value: deathCause.deathCauseId,
    })
  );

  const jurisdictionItems = jurisdictions?.map(
    (jurisdiction): MenuItem<string> => ({
      label: jurisdiction.name === 'Canada' ? 'Canada (federal)' : jurisdiction.name,
      value: jurisdiction.jurisdictionId,
    })
  );

  // TODO: prevent flicker after search by displaying previous search results.
  return (
    <div className={classes.layout}>
      <SearchMenu
        searchType={SearchType.Inquest}
        onSearchTypeChange={onSearchTypeChange}
        onSearchClear={handleSearchClear}
      >
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
              items={category.inquestKeywords.map(
                (keyword): MenuItem<string> => ({
                  label: keyword.name,
                  value: keyword.inquestKeywordId,
                })
              )}
              selectedValues={query.keywords[category.inquestCategoryId] || []}
              onChange={(selectedKeywords) =>
                handleKeywordsChange(category.inquestCategoryId, selectedKeywords)
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
          items={deathCauseItems ?? []}
          loading={!deathCauseItems}
          selectedValue={query.deathCause}
          onChange={handleDeathCauseChange}
          label="Cause of Death"
        />
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
        loading={!inquests}
        count={inquests?.count ?? 0}
        pagination={PAGINATION}
        sort={query.sort}
        page={query.page}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      >
        {inquests?.data.map((inquest, i) => (
          <InquestSearchResult key={i} inquest={inquest} query={query} />
        ))}
      </SearchResults>
    </div>
  );
};

export default InquestSearch;
