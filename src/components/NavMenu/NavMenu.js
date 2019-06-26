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

function NavItem(props) {
  return (
    <Link
      to={props.link}
      className={clsx(props.classes.navLink, props.classes.navItem)}
    >
      <Button color="inherit">{props.label}</Button>
    </Link>
  );
}

function NavAction(props) {
  return (
    <Button onClick={props.action} color="inherit">
      {props.label}
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
        {!props.isSignedIn && (
          <NavItem classes={classes} label="Sign Up" link="/signup" />
        )}
        {!props.isSignedIn && (
          <NavItem classes={classes} label="Sign In" link="/signin" />
        )}
        {props.isSignedIn && (
          <NavAction label="Sign Out" action={handleSignOut} />
        )}
      </ToolBar>
    </AppBar>
  );
}
