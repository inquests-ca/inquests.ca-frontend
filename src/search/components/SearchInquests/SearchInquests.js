import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import SearchMenu from '../SearchMenu';
import SearchResults from '../SearchResults';
import SearchResultInquest from '../SearchResultInquest';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson, encodeQueryData } from 'common/services/requestUtils';

const PAGINATION = 50;

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    // TODO: better way of setting height.
    height: '85vh'
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
export default function SearchInquests(props) {
  const [inquests, setInquests] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [page, setPage] = useState(1);

  const isMounted = useMountedState();

  const { className } = props;

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetchJson('/inquestKeywords');
      if (!response.error && isMounted()) setKeywords(response.data);
    };
    fetchKeywords();
  }, [isMounted]);

  useEffect(() => {
    const fetchInquests = async () => {
      const query = {
        q: textSearch,
        keyword: selectedKeywords,
        offset: (page - 1) * PAGINATION
      };
      const response = await fetchJson(`/inquests${encodeQueryData(query)}`);
      if (!response.error && isMounted()) setInquests(response.data);
    };
    fetchInquests();
  }, [textSearch, selectedKeywords, page, isMounted]);

  const handleTextSearchChange = event => {
    if (event.key === 'Enter') {
      setPage(1);
      setTextSearch(event.target.value);
    }
  };
  const handleKeywordsChange = newSelectedKeywords => {
    setPage(1);
    setSelectedKeywords(newSelectedKeywords);
  };
  const hanldePageChange = newPage => setPage(newPage);

  const keywordItems =
    keywords &&
    keywords.map(keywordCategory => ({
      label: keywordCategory.name,
      items: keywordCategory.inquestKeywords.map(keyword => ({
        label: keyword.name,
        value: keyword.inquestKeywordId
      }))
    }));

  const classes = useStyles();

  return (
    <div className={clsx(className, classes.layout)}>
      <SearchMenu className={classes.searchMenuLayout}>
        <TextField
          className={classes.searchMenuComponent}
          onKeyPress={handleTextSearchChange}
          label="Search Inquests"
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
      {inquests && (
        <SearchResults
          className={classes.searchResultsLayout}
          count={inquests.count}
          pagination={PAGINATION}
          page={page}
          onPageChange={hanldePageChange}
        >
          {inquests.data.map((inquest, i) => (
            <SearchResultInquest key={i} inquest={inquest} />
          ))}
        </SearchResults>
      )}
    </div>
  );
}
