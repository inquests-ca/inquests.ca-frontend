import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import SearchMenu from '../SearchMenu';
import SearchResults from '../SearchResults';
import SearchResultAuthority from '../SearchResultAuthority';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson, encodeQueryData } from 'common/services/requestUtils';

const PAGINATION = 50;

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '90vh'
  },
  searchMenuLayout: {
    margin: theme.spacing(4),
    marginRight: 0
  },
  searchMenuComponent: {
    marginBottom: theme.spacing(4)
  },
  searchResultsLayout: {
    margin: theme.spacing(4),
    flexGrow: 1
  }
}));

// TODO: add fetching indicator for keywords.
export default function SearchAuthorities(props) {
  const [authorities, setAuthorities] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [page, setPage] = useState(1);

  const isMounted = useMountedState();

  const { className } = props;

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetchJson('/authorityKeywords');
      if (!response.error && isMounted()) setKeywords(response.data);
    };
    fetchKeywords();
  }, [isMounted]);

  useEffect(() => {
    const fetchAuthorities = async () => {
      const query = {
        text: textSearch,
        keywords: selectedKeywords,
        offset: (page - 1) * PAGINATION
      };
      const response = await fetchJson(`/authorities${encodeQueryData(query)}`);
      if (!response.error && isMounted()) setAuthorities(response.data);
    };
    fetchAuthorities();
  }, [textSearch, selectedKeywords, page, isMounted]);

  const handleTextSearchChange = event => {
    if (event.key === 'Enter') {
      setPage(1);
      setTextSearch(event.target.value);
    }
  };
  const handleTextSearchLostFocus = event => {
    setPage(1);
    setTextSearch(event.target.value);
  };
  const handleKeywordsChange = newSelectedKeywords => {
    setPage(1);
    setSelectedKeywords(newSelectedKeywords);
  };
  const handlePageChange = newPage => setPage(newPage);

  const keywordItems =
    keywords &&
    keywords.map(keywordCategory => ({
      label: keywordCategory.name,
      items: keywordCategory.authorityKeywords.map(keyword => ({
        label: keyword.name,
        value: keyword.authorityKeywordId
      }))
    }));

  const classes = useStyles();

  return (
    <div className={clsx(className, classes.layout)}>
      <SearchMenu className={classes.searchMenuLayout}>
        <TextField
          className={classes.searchMenuComponent}
          onKeyPress={handleTextSearchChange}
          onBlur={handleTextSearchLostFocus}
          label="Search Authorities"
          name="search"
          type="search"
          fullWidth
        />
        {keywords && (
          <NestedMultiSelect
            className={classes.searchMenuComponent}
            items={keywordItems}
            selectedValues={selectedKeywords}
            onChange={handleKeywordsChange}
            renderLabel={selected =>
              selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
            }
            fullWidth
          />
        )}
      </SearchMenu>
      {authorities && (
        <SearchResults
          className={classes.searchResultsLayout}
          count={authorities.count}
          pagination={PAGINATION}
          page={page}
          onPageChange={handlePageChange}
        >
          {authorities.data.map((authority, i) => (
            <SearchResultAuthority key={i} authority={authority} />
          ))}
        </SearchResults>
      )}
    </div>
  );
}
