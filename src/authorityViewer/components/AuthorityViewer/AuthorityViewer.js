import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AuthoritySearch from '../AuthoritySearch';
import AuthorityTable from '../AuthorityTable';

// TODO: rename this component and related components.
const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    textAlign: 'center',
    // TODO: better way of setting height.
    height: '85vh'
  },
  search: {
    margin: theme.spacing(4),
    marginRight: 0
  },
  table: {
    margin: theme.spacing(4),
    flexGrow: 1
  }
}));

export default function AuthorityViewer() {
  // TODO: use React context or global state to manage search results, and possibly keywords.
  // TODO: refactor logic. For example, does it make sense that this component has keywords in its state?
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordsSelected = event =>
    setSelectedKeywords(event.target.value);

  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <AuthoritySearch
        className={classes.search}
        selectedKeywords={selectedKeywords}
        onKeywordsSelected={handleKeywordsSelected}
      />
      <AuthorityTable className={classes.table} keywords={selectedKeywords} />
    </div>
  );
}
