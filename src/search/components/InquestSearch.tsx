import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import InquestSearchResult from './InquestSearchResult';
import { InquestQuery, fetchInquests } from '../utils/api';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import { fetchJson } from 'common/utils/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InquestCategory } from 'common/models';
import { AuthorityOrInquest } from 'common/types';
import { PAGINATION } from 'common/constants';

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

interface InquestSearchProps {
  query: InquestQuery;
  onQueryChange: (query: InquestQuery) => void;
  onSearchTypeChange: (searchType: AuthorityOrInquest) => void;
}

const InquestSearch = ({ query, onQueryChange, onSearchTypeChange }: InquestSearchProps) => {
  const { data: keywords } = useQuery('inquestKeywords', () =>
    fetchJson<InquestCategory[]>('/keywords/inquest')
  );

  const { data: inquests } = useQuery(['inquests', query], (_key: string, query: InquestQuery) =>
    fetchInquests(query)
  );

  const handlePageChange = (page: number): void => onQueryChange({ ...query, page });
  const handleTextSearch = (text: string): void => onQueryChange({ ...query, page: 1, text });
  const handleKeywordsChange = (selectedKeywords: string[]): void =>
    onQueryChange({ ...query, page: 1, keywords: selectedKeywords });

  const classes = useStyles();

  const keywordItems = keywords?.map((keywordCategory) => ({
    label: keywordCategory.name,
    items: keywordCategory.inquestKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.inquestKeywordId,
    })),
  }));

  // TODO: prevent flicker after search by displaying previous search results.
  return (
    <div className={classes.layout}>
      <SearchMenu searchType="inquest" onSearchTypeChange={onSearchTypeChange}>
        <SearchField onSearch={handleTextSearch} label="Search Inquests" name="search" />
        {
          <NestedMultiSelect
            items={keywordItems ?? []}
            loading={!keywordItems}
            selectedValues={query.keywords}
            onChange={handleKeywordsChange}
            renderLabel={(selected) =>
              selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
            }
          />
        }
      </SearchMenu>
      {inquests ? (
        <SearchResults
          count={inquests.count}
          pagination={PAGINATION}
          page={query.page}
          onPageChange={handlePageChange}
        >
          {inquests.data.map((inquest, i) => (
            <InquestSearchResult key={i} inquest={inquest} />
          ))}
        </SearchResults>
      ) : (
        <CircularProgress className={classes.loading} />
      )}
    </div>
  );
};

export default InquestSearch;
