import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  navMenu: {
    borderTop: `5px solid ${theme.palette.common.black}`,
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.common.white
  },
  navTextDefault: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  navTextLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.text.link
  },
  navHeader: {
    flexGrow: 1
  },
  navItem: {
    marginLeft: theme.spacing(4)
  }
}));

function NavLink(props) {
  const classes = useStyles();

  return (
    <Link to={props.to} className={classes.navTextLink}>
      {props.label}
    </Link>
  );
}

function NavAction(props) {
  const classes = useStyles();

  return (
    <span onClick={props.action} className={classes.navTextLink}>
      {props.label}
    </span>
  );
}

function NavItem(props) {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      className={clsx(classes.navItem, classes.navTextDefault)}
    >
      {props.children}
    </Typography>
  );
}

export default function NavHeader(props) {
  const { currentUser } = props;
  const adminAuthorization =
    currentUser && currentUser.authorization === 'admin';

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navMenu}>
      <ToolBar>
        <Typography variant="h5" className={classes.navHeader}>
          <Link to="/" className={classes.navTextDefault}>
            Inquests.ca
          </Link>
        </Typography>
        {!currentUser && (
          <NavItem>
            <NavLink label="Sign Up" to="/signup" />
            &nbsp;or&nbsp;
            <NavLink label="Sign In" to="/signin" />
          </NavItem>
        )}
        {adminAuthorization && (
          <NavItem>
            <NavLink label="Create Authority" to="/create" />
          </NavItem>
        )}
        {currentUser && (
          <NavItem>
            <NavAction label="Sign Out" action={currentUser.signOut} />
          </NavItem>
        )}
      </ToolBar>
    </AppBar>
  );
}

NavHeader.propTypes = {
  currentUser: PropTypes.object
};