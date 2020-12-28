import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import { NavigationEvent, reportNavigation } from 'common/utils/analytics';

const useStyles = makeStyles((theme) => ({
  // Removes default anchor styling from anchor elements.
  navReset: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  navItem: {
    marginLeft: theme.spacing(4),
  },
}));

interface NavButtonProps extends NavigationEvent {
  to: string;
  label: string;
  external?: boolean;
}

const NavButton = ({ to, label, location, external }: NavButtonProps) => {
  const classes = useStyles();

  // External meaning external to React app, not necessarily an external website
  // TODO: remove underline on hover.
  if (external)
    return (
      <MuiLink
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(classes.navItem, classes.navReset)}
        onClick={() => reportNavigation({ location })}
      >
        <Button>{label}</Button>
      </MuiLink>
    );

  return (
    <Link
      to={to}
      className={clsx(classes.navItem, classes.navReset)}
      onClick={() => reportNavigation({ location })}
    >
      <Button>{label}</Button>
    </Link>
  );
};

export default NavButton;
