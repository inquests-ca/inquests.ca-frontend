import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import SearchMenu from './SearchMenu';
import SearchResults from './SearchResults';
import AuthoritySearchResult from './AuthoritySearchResult';
import { AuthorityQuery, fetchAuthorities } from '../utils/api';
import SearchField from 'common/components/SearchField';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import { fetchJson } from 'common/utils/request';
import LoadingPage from 'common/components/LoadingPage';
import { AuthorityCategory } from 'common/models';

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

const AuthoritySearch = () => {
  const [text, setText] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data: keywords } = useQuery('authorityKeywords', () =>
    fetchJson<AuthorityCategory[]>('/keywords/authority')
  );

  const authorityQuery: AuthorityQuery = { keywords: selectedKeywords, text, page };
  const { data: authorities } = useQuery(
    ['authorities', authorityQuery],
    (_key: string, query: AuthorityQuery) => fetchAuthorities(query)
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
  if (!authorities || !keywords) return <LoadingPage />;

  const keywordItems = keywords.map((keywordCategory) => ({
    label: keywordCategory.name,
    items: keywordCategory.authorityKeywords.map((keyword) => ({
      label: keyword.name,
      value: keyword.authorityKeywordId,
    })),
  }));

  return (
    <div className={classes.layout}>
      <SearchMenu>
        <SearchField onSearch={handleTextSearch} label="Search Authorities" name="search" />
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
      {authorities && (
        <SearchResults
          count={authorities.count}
          pagination={PAGINATION}
          page={page}
          onPageChange={handlePageChange}
        >
          {authorities.data.map((authority, i) => (
            <AuthoritySearchResult key={i} authority={authority} />
          ))}
        </SearchResults>
      )}
    </div>
  );
};

export default AuthoritySearch;
