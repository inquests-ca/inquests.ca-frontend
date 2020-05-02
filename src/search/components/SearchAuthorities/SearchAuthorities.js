import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MultiSelect from 'common/components/MultiSelect';

const useStyles = makeStyles(theme => ({
  searchComponent: {
    marginBottom: theme.spacing(4)
  }
}));

export default function SearchAuthorities(props) {
  // TODO: add fetching indicator.
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { className, keywords, onQueryChange } = props;

  useEffect(() => {
    onQueryChange(selectedKeywords);
  }, [onQueryChange, selectedKeywords]);

  const handleKeywordsChange = newSelectedKeywords => setSelectedKeywords(newSelectedKeywords);

  const keywordItems =
    keywords &&
    keywords.map(keyword => ({
      label: keyword.name,
      value: keyword.authorityKeywordID
    }));

  const classes = useStyles();

  return (
    <div className={className}>
      {keywords && (
        <MultiSelect
          className={classes.searchComponent}
          items={keywordItems}
          selectedValues={selectedKeywords}
          onChange={handleKeywordsChange}
          renderLabel={selected =>
            selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
          }
        />
      )}
    </div>
  );
}
