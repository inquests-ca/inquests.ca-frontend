import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  navMenu: {
    backgroundColor: theme.palette.grey[900]
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  navHeader: {
    flexGrow: 1
  },
  navItem: {
    marginLeft: theme.spacing(4)
  }
}));

function NavItem(classes, link, label) {
  return (
    <Link to={link} className={clsx(classes.navLink, classes.navItem)}>
      <Button color="inherit">{label}</Button>
    </Link>
  );
}

export default function NavMenu() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navMenu}>
      <ToolBar>
        <Typography variant="h6" className={classes.navHeader}>
          <Link to="/" className={classes.navLink}>
            Inquests.ca
          </Link>
        </Typography>
        {NavItem(classes, '/signup', 'Sign Up')}
        {NavItem(classes, '/signin', 'Sign In')}
      </ToolBar>
    </AppBar>
  );
}
