import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import MultiSelect from '../../../common/components/MultiSelect';
import { fetchNoAuth } from '../../../common/services/fetchHelper';

const useStyles = makeStyles(theme => ({
  layout: {
    minWidth: 250,
    maxWidth: 300,
    padding: theme.spacing(2)
  },
  progress: {
    marginTop: theme.spacing(4)
  }
}));

export default function AuthoritySearch(props) {
  const [keywords, setKeywords] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const { className, onKeywordsSelected, selectedKeywords } = props;

  const fetchKeywords = async () => {
    setIsFetching(true);
    const response = await fetchNoAuth('/authorityKeywords');
    if (response.ok) {
      let json;
      try {
        json = await response.json();
      } catch (e) {
        return;
      }
      setIsFetching(false);
      // Parse JSON for multiselect.
      setKeywords(
        json.map(keyword => ({
          name: keyword.name,
          value: keyword.authorityKeywordID
        }))
      );
    }
  };

  useEffect(() => {
    if (!keywords && !isFetching) fetchKeywords();
  });

  const classes = useStyles();

  return (
    <Paper className={clsx(className, classes.layout)}>
      {keywords && (
        <MultiSelect
          inputLabel="authority-keywords-label"
          inputId="authority-keywords"
          items={keywords}
          selected={selectedKeywords}
          handleItemSelected={onKeywordsSelected}
          renderLabel={selected =>
            selected.length === 0
              ? 'Select Keywords'
              : `${selected.length} Keywords Selected`
          }
        />
      )}
      {isFetching && <CircularProgress className={classes.progress} />}
    </Paper>
  );
}
