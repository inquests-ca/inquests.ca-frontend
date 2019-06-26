import React from 'react';
import clsx from 'clsx';
import * as firebase from 'firebase/app';
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

function NavItem(classes, label, link) {
  return (
    <Link to={link} className={clsx(classes.navLink, classes.navItem)}>
      <Button color="inherit">{label}</Button>
    </Link>
  );
}

function NavAction(classes, label, action) {
  return (
    <Button onClick={action} color="inherit">
      {label}
    </Button>
  );
}

export default function NavMenu(props) {
  const classes = useStyles();

  const handleSignOut = () => firebase.auth().signOut();

  return (
    <AppBar position="fixed" className={classes.navMenu}>
      <ToolBar>
        <Typography variant="h6" className={classes.navHeader}>
          <Link to="/" className={classes.navLink}>
            Inquests.ca
          </Link>
        </Typography>
        {!props.isSignedIn && NavItem(classes, 'Sign Up', '/signup')}
        {!props.isSignedIn && NavItem(classes, 'Sign In', '/signin')}
        {props.isSignedIn && NavAction(classes, 'Sign Out', handleSignOut)}
      </ToolBar>
    </AppBar>
  );
}
