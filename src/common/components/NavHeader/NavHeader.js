import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// TODO: note that offset doesn't match header. Consider using Material UI native toolbar instead.
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
  },
  offset: theme.mixins.toolbar
}));

function NavLink(props) {
  const { classes } = props;

  return (
    <Link to={props.to} className={classes.navTextLink}>
      {props.label}
    </Link>
  );
}

function NavItem(props) {
  const { classes } = props;

  return (
    <Typography variant="body1" className={clsx(classes.navItem, classes.navTextDefault)}>
      {props.children}
    </Typography>
  );
}

export default function NavHeader(props) {
  const classes = useStyles();

  // TODO: there should be some visual separation for Authorities, Inquests, and Sign Up/Sign In functionality.
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.navMenu}>
        <Toolbar>
          <Typography variant="h5" className={classes.navHeader}>
            <Link to="/" className={classes.navTextDefault}>
              Inquests.ca
            </Link>
          </Typography>
          <NavItem classes={classes}>
            <NavLink classes={classes} label="Authorities" to="/authorities" />
          </NavItem>
          <NavItem classes={classes}>
            <NavLink classes={classes} label="Inquests" to="/inquests" />
          </NavItem>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  );
}
