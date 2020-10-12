import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  layout: {
    // Using the width property does not work here.
    minWidth: 300,
    maxWidth: 300,
    padding: theme.spacing(4)
  }
}));

interface SearchMenuProps {
  children: React.ReactNode;
  className?: string;
}

const SearchMenu = ({ className, children }: SearchMenuProps) => {
  const classes = useStyles();

  return <Paper className={clsx(className, classes.layout)}>{children}</Paper>;
};

export default SearchMenu;
