import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import AuthoritySearchResult from './AuthoritySearchResult';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/utils/request';
import LoadingPage from 'common/components/LoadingPage';
import { Authority, AuthorityCategory } from 'common/models';
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

const AuthoritySearch = () => {
  const [authorityCount, setAuthorityCount] = useState(0);
  const [authorities, setAuthorities] = useState<Authority[] | null>(null);
  const [keywords, setKeywords] = useState<AuthorityCategory[] | null>(null);

  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const isMounted = useMountedState();

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetchJson<AuthorityCategory[]>('/keywords/authority');
      if (!response.error && isMounted()) setKeywords(response.data!);
    };
    fetchKeywords();
  }, [isMounted]);

  useEffect(() => {
    const fetchAuthorities = async () => {
      const query = {
        text: textSearch,
        keywords: selectedKeywords,
        offset: (page - 1) * PAGINATION,
        limit: PAGINATION,
      };
      const response = await fetchJson<DataWithCount<Authority[]>>('/authorities', query);
      if (!response.error && isMounted()) {
        setAuthorities(response.data!.data);
        setAuthorityCount(response.data!.count);
      }
    };
    fetchAuthorities();
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
  if (authorities === null || keywords === null) return <LoadingPage />;

  const keywordItems = keywords.map((keywordCategory) => ({
    label: keywordCategory.name,
    items: keywordCategory.authorityKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.authorityKeywordId,
    })),
  }));

  return (
    <div className={classes.layout}>
      <SearchMenu className={classes.searchMenuLayout}>
        <SearchField
          className={classes.searchMenuComponent}
          onSearch={handleTextSearch}
          label="Search Authorities"
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
      {authorities && (
        <SearchResults
          className={classes.searchResultsLayout}
          count={authorityCount}
          pagination={PAGINATION}
          page={page}
          onPageChange={handlePageChange}
        >
          {authorities.map((authority, i) => (
            <AuthoritySearchResult key={i} authority={authority} />
          ))}
        </SearchResults>
      )}
    </div>
  );
};

export default AuthoritySearch;
