import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MultiSelect from 'common/components/MultiSelect';
import SingleSelect from 'common/components/SingleSelect';

const useStyles = makeStyles(theme => ({
  searchComponent: {
    marginBottom: theme.spacing(4)
  }
}));

export default function SearchAuthorities(props) {
  // TODO: add fetching indicator.
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');

  const { className, keywords, jurisdictions, onQueryChange } = props;

  useEffect(() => {
    onQueryChange(selectedKeywords, selectedJurisdiction);
  }, [onQueryChange, selectedKeywords, selectedJurisdiction]);

  const handleKeywordsChange = newSelectedKeywords => setSelectedKeywords(newSelectedKeywords);
  const handleJurisdictionChange = newSelectedJurisdiction =>
    setSelectedJurisdiction(newSelectedJurisdiction);

  const keywordItems =
    keywords &&
    keywords.map(keyword => ({
      label: keyword.name,
      value: keyword.authorityKeywordID
    }));

  const jurisdictionItems =
    jurisdictions &&
    jurisdictions.map(jurisdiction => ({
      // TODO: consider defining federal jurisdictions in a way other than subdivision == NULL, such that fetching names is easier.
      label: jurisdiction.code,
      value: jurisdiction.jurisdictionID
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
      {jurisdictions && (
        <SingleSelect
          className={classes.searchComponent}
          items={jurisdictionItems}
          emptyItem
          selectedValue={selectedJurisdiction}
          onChange={handleJurisdictionChange}
        />
      )}
    </div>
  );
}
