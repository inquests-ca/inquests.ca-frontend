import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // Removes default anchor styling from anchor elements.
  navReset: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  navItem: {
    marginLeft: theme.spacing(4)
  }
}));

interface NavButtonProps {
  to: string;
  label: string;
  external?: boolean;
}

const NavButton = ({ to, label, external }: NavButtonProps) => {
  const classes = useStyles();

  // External meaning external to React app, not necessarily an external website
  // TODO: remove underline on hover.
  if (external)
    return (
      <MuiLink href={to} className={clsx(classes.navItem, classes.navReset)}>
        <Button>{label}</Button>
      </MuiLink>
    );

  return (
    <Link to={to} className={clsx(classes.navItem, classes.navReset)}>
      <Button>{label}</Button>
    </Link>
  );
};

export default NavButton;
