import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import SearchMenu from '../SearchMenu';
import SearchResults from '../SearchResults';
import SearchResultAuthority from '../SearchResultAuthority';
import NestedMultiSelect from 'common/components/NestedMultiSelect';
import { fetchJson, encodeQueryData } from 'common/services/requestUtils';

const useStyles = makeStyles(theme => ({
  layout: {
    // TODO: better way of setting top margin.
    marginTop: theme.spacing(10),
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
export default function SearchAuthorities(props) {
  const [authorities, setAuthorities] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { className } = props;

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await fetchJson('/authorityKeywords');
      if (!response.error) setKeywords(response.data);
    };
    fetchKeywords();
  }, []);

  useEffect(() => {
    const fetchAuthorities = async () => {
      const response = await fetchJson(
        `/authorities${encodeQueryData({ q: textSearch, keyword: selectedKeywords })}`
      );
      if (!response.error) setAuthorities(response.data);
    };
    fetchAuthorities();
  }, [textSearch, selectedKeywords]);

  const handleTextSearchChange = event => {
    if (event.key === 'Enter') setTextSearch(event.target.value);
  };
  const handleKeywordsChange = newSelectedKeywords => setSelectedKeywords(newSelectedKeywords);

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
        <SearchResults className={classes.searchResultsLayout} count={authorities.count}>
          {authorities.data.map((authority, i) => (
            <SearchResultAuthority key={i} authority={authority} />
          ))}
        </SearchResults>
      )}
    </div>
  );
}
