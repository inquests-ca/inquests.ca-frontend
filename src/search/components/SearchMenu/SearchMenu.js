import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  layout: {
    // Using the width property does not work here.
    minWidth: 300,
    maxWidth: 300,
    padding: theme.spacing(4)
  }
}));

export default function SearchMenu(props) {
  const { className, children } = props;

  const classes = useStyles();

  return <Paper className={clsx(className, classes.layout)}>{children}</Paper>;
}
