import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import AccountMenu from '../AccountMenu';

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
    color: theme.palette.text.link
  },
  navHeader: {
    flexGrow: 1
  },
  navItem: {
    marginLeft: theme.spacing(4)
  },
  accountMenu: {
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

// TODO: fix positioning of account menu.
// TODO: make the Create Authority link a button.
export default function NavHeader(props) {
  const { currentUser } = props;
  const adminAuthorization =
    currentUser && currentUser.authorization === 'admin';

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navMenu}>
      <ToolBar>
        <Typography variant="h4" className={classes.navHeader}>
          <Link to="/" className={classes.navTextDefault}>
            Inquests.ca
          </Link>
        </Typography>
        {!currentUser && (
          <NavItem>
            <NavLink to="/signup" label="Sign Up" />
            &nbsp;or&nbsp;
            <NavLink to="/signin" label="Sign In" />
          </NavItem>
        )}
        {adminAuthorization && (
          <NavItem>
            <NavLink to="/create" label="Create Authority" />
          </NavItem>
        )}
        {currentUser && (
          <AccountMenu
            currentUser={currentUser}
            className={classes.accountMenu}
          />
        )}
      </ToolBar>
    </AppBar>
  );
}

NavHeader.propTypes = {
  currentUser: PropTypes.object
};
