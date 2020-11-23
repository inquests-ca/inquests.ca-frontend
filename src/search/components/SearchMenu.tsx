import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: theme.spacing(4),
    height: `calc(100vh - ${theme.spacing(8)}px - 64px)`,
    display: 'grid',
    gridTemplateRows: 'min-content',
    gridRowGap: theme.spacing(4),
  },
}));

interface SearchMenuProps {
  children: React.ReactNode;
  className?: string;
}

const SearchMenu = ({ children, className }: SearchMenuProps) => {
  const classes = useStyles();

  return <Paper className={clsx(className, classes.layout)}>{children}</Paper>;
};

export default SearchMenu;
