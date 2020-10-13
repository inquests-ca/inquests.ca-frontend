import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import { InquestSearchResult } from './InquestSearchResult';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/utils/request';
import LoadingPage from 'common/components/LoadingPage';
import { Inquest, InquestCategory } from 'common/models';
import { DataWithCount } from 'common/types';

const PAGINATION = 12;

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '90vh',
  },
  searchMenuLayout: {
    margin: theme.spacing(4),
    marginRight: 0,
  },
  searchMenuComponent: {
    marginBottom: theme.spacing(4),
  },
  searchResultsLayout: {
    margin: theme.spacing(4),
    flexGrow: 1,
  },
}));

const InquestSearch = () => {
  const [inquestCount, setInquestCount] = useState(0);
  const [inquests, setInquests] = useState<Inquest[] | null>(null);
  const [keywords, setKeywords] = useState<InquestCategory[] | null>(null);

  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const isMounted = useMountedState();

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetchJson<InquestCategory[]>('/inquestKeywords');
      if (!response.error && isMounted()) setKeywords(response.data!);
    };
    fetchKeywords();
  }, [isMounted]);

  useEffect(() => {
    const fetchInquests = async () => {
      const query = {
        text: textSearch,
        keywords: selectedKeywords,
        offset: (page - 1) * PAGINATION,
        limit: PAGINATION,
      };
      const response = await fetchJson<DataWithCount<Inquest[]>>('/inquests', query);
      if (!response.error && isMounted()) {
        setInquests(response.data!.data);
        setInquestCount(response.data!.count);
      }
    };
    fetchInquests();
  }, [textSearch, selectedKeywords, page, isMounted]);

  const handleTextSearch = (text: string): void => {
    setPage(1);
    setTextSearch(text);
  };

  const handleKeywordsChange = (newSelectedKeywords: string[]): void => {
    setPage(1);
    setSelectedKeywords(newSelectedKeywords);
  };

  const handlePageChange = (newPage: number): void => setPage(newPage);

  const classes = useStyles();

  // TODO: show loading indicator every time a new search is performed.
  if (inquests === null || keywords === null) return <LoadingPage />;

  const keywordItems = keywords.map((keywordCategory) => ({
    label: keywordCategory.name,
    items: keywordCategory.inquestKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.inquestKeywordId,
    })),
  }));

  return (
    <div className={classes.layout}>
      <SearchMenu className={classes.searchMenuLayout}>
        <SearchField
          className={classes.searchMenuComponent}
          onSearch={handleTextSearch}
          label="Search Inquests"
          name="search"
          fullWidth
        />
        {keywords && (
          <NestedMultiSelect
            className={classes.searchMenuComponent}
            items={keywordItems}
            selectedValues={selectedKeywords}
            onChange={handleKeywordsChange}
            renderLabel={(selected) =>
              selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
            }
            fullWidth
          />
        )}
      </SearchMenu>
      {inquests && (
        <SearchResults
          className={classes.searchResultsLayout}
          count={inquestCount}
          pagination={PAGINATION}
          page={page}
          onPageChange={handlePageChange}
        >
          {inquests.map((inquest, i) => (
            <InquestSearchResult key={i} inquest={inquest} />
          ))}
        </SearchResults>
      )}
    </div>
  );
};

export default InquestSearch;
