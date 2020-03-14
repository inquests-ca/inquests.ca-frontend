import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function SearchResults(props) {
  const { className, children } = props;

  // TODO: consider adding header such as "X results"
  return <div className={className}>{children && <Paper>{children}</Paper>}</div>;
}
