import React from 'react';
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
import { fetchJson } from 'common/utils/request';
import { InquestCategory, Jurisdiction } from 'common/models';
import { MenuItem, MenuItemGroup, SearchType } from 'common/types';
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
}));

interface InquestSearchProps {
  onQueryChange: (query: InquestQuery) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
}

const InquestSearch = ({ onQueryChange, onSearchTypeChange }: InquestSearchProps) => {
  const queryParams = useQueryParams<InquestQuery>(inquestQuerySchema);
  const query = { ...defaultInquestQuery(), ...queryParams };

  const { data: keywords } = useQuery('inquestKeywords', () =>
    fetchJson<InquestCategory[]>('/keywords/inquest')
  );

  const { data: inquests } = useQuery(['inquests', query], (_key: string, query: InquestQuery) =>
    fetchInquests(query)
  );

  const { data: jurisdictions } = useQuery('jurisdictions', () =>
    fetchJson<Jurisdiction[]>('/jurisdictions')
  );

  const handleSortChange = (sort: Sort): void => onQueryChange({ ...query, sort });
  const handlePageChange = (page: number): void => onQueryChange({ ...query, page });
  const handleTextSearch = (text: string): void => onQueryChange({ ...query, page: 1, text });
  const handleKeywordsSelect = (selectedKeywords: string[]): void =>
    onQueryChange({ ...query, page: 1, keywords: selectedKeywords });
  const handleJurisdictionSelect = (jurisdiction: string): void =>
    onQueryChange({ ...query, page: 1, jurisdiction });

  const classes = useStyles();

  const keywordItems = keywords?.map(
    (keywordCategory): MenuItemGroup<string> => ({
      header: keywordCategory.name,
      items: keywordCategory.inquestKeywords.map((keyword) => ({
        label: keyword.name,
        value: keyword.inquestKeywordId,
      })),
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
      <SearchMenu searchType={SearchType.Inquest} onSearchTypeChange={onSearchTypeChange}>
        <SearchField
          defaultValue={query.text}
          onSearch={handleTextSearch}
          label="Enter search terms"
          name="search"
        />
        <MultiSelect
          items={keywordItems ?? []}
          loading={!keywordItems}
          selectedValues={query.keywords}
          onChange={handleKeywordsSelect}
          renderValues={(selected) =>
            selected.length > 1
              ? `${selected.length} Keywords Selected`
              : selected.length === 1
              ? `${selected.length} Keyword Selected`
              : undefined
          }
          label="Keywords"
        />
        <SingleSelect
          emptyItem
          items={jurisdictionItems ?? []}
          loading={!jurisdictionItems}
          selectedValue={query.jurisdiction}
          onChange={handleJurisdictionSelect}
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
          <InquestSearchResult key={i} inquest={inquest} />
        ))}
      </SearchResults>
    </div>
  );
};

export default InquestSearch;
