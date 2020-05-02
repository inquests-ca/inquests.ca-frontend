import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import MultiSelect from 'common/components/MultiSelect';

const useStyles = makeStyles(theme => ({
  searchComponent: {
    marginBottom: theme.spacing(4)
  }
}));

export default function SearchInquests(props) {
  // TODO: add fetching indicator.
  const [textSearch, setTextSearch] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { className, keywords, onQueryChange } = props;

  useEffect(() => {
    onQueryChange(textSearch, selectedKeywords);
  }, [onQueryChange, textSearch, selectedKeywords]);

  const handleTextSearchChange = event => {
    if (event.key === 'Enter') setTextSearch(event.target.value);
  };
  const handleKeywordsChange = newSelectedKeywords => setSelectedKeywords(newSelectedKeywords);

  const keywordItems =
    keywords &&
    keywords.map(keyword => ({
      label: keyword.name,
      value: keyword.inquestKeywordID
    }));

  const classes = useStyles();

  return (
    <div className={className}>
      <TextField
        className={classes.searchComponent}
        onKeyPress={handleTextSearchChange}
        label="Search Inquests"
        name="search"
        type="search"
        fullWidth
      />
      {keywords && (
        <MultiSelect
          className={classes.searchComponent}
          items={keywordItems}
          selectedValues={selectedKeywords}
          onChange={handleKeywordsChange}
          renderLabel={selected =>
            selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
          }
          fullWidth
        />
      )}
    </div>
  );
}
