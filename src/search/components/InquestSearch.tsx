import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import InquestSearchResult from './InquestSearchResult';
import { InquestQuery, fetchInquests } from '../utils/api';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import { fetchJson } from 'common/utils/request';
import LoadingPage from 'common/components/LoadingPage';
import { InquestCategory } from 'common/models';

const PAGINATION = 12;

const useStyles = makeStyles((theme) => ({
  layout: {
    margin: theme.spacing(4),
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gridColumnGap: theme.spacing(4),
    alignItems: 'start',
  },
}));

const InquestSearch = () => {
  const [text, setText] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data: keywords } = useQuery('inquestKeywords', () =>
    fetchJson<InquestCategory[]>('/keywords/inquest')
  );

  const inquestQuery: InquestQuery = { keywords: selectedKeywords, text, page };
  const { data: inquests } = useQuery(
    ['inquests', inquestQuery],
    (_key: string, query: InquestQuery) => fetchInquests(query)
  );

  const handleTextSearch = (newText: string): void => {
    setPage(1);
    setText(newText);
  };

  const handleKeywordsChange = (newSelectedKeywords: string[]): void => {
    setPage(1);
    setSelectedKeywords(newSelectedKeywords);
  };

  const handlePageChange = (newPage: number): void => setPage(newPage);

  const classes = useStyles();

  // TODO: show loading indicator every time a new search is performed.
  if (!inquests || !keywords) return <LoadingPage />;

  const keywordItems = keywords.map((keywordCategory) => ({
    label: keywordCategory.name,
    items: keywordCategory.inquestKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.inquestKeywordId,
    })),
  }));

  return (
    <div className={classes.layout}>
      <SearchMenu>
        <SearchField onSearch={handleTextSearch} label="Search Inquests" name="search" />
        {keywords && (
          <NestedMultiSelect
            items={keywordItems}
            selectedValues={selectedKeywords}
            onChange={handleKeywordsChange}
            renderLabel={(selected) =>
              selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
            }
          />
        )}
      </SearchMenu>
      {inquests && (
        <SearchResults
          count={inquests.count}
          pagination={PAGINATION}
          page={page}
          onPageChange={handlePageChange}
        >
          {inquests.data.map((inquest, i) => (
            <InquestSearchResult key={i} inquest={inquest} />
          ))}
        </SearchResults>
      )}
    </div>
  );
};

export default InquestSearch;
