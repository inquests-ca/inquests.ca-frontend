import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import NavButton from './NavButton';
import { URL_TERMS_OF_USE } from 'common/constants';

const useStyles = makeStyles((theme) => ({
  navMenu: {
    backgroundColor: theme.palette.common.white
  },
  // Removes default anchor styling from anchor elements.
  navReset: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  navHeader: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar
}));

const NavHeader = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.navMenu}>
        <Toolbar>
          <Typography variant="h5" className={classes.navHeader}>
            <Link to="/" className={classes.navReset}>
              Inquests.ca
            </Link>
          </Typography>
          <NavButton to="/authorities" label="Authorities" />
          <NavButton to="/inquests" label="Inquests" />
          <NavButton to={URL_TERMS_OF_USE} label="Terms of Use" external />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default NavHeader;
