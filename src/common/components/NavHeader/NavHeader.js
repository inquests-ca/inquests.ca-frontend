import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
  navItem: {
    marginLeft: theme.spacing(4)
  },
  offset: theme.mixins.toolbar
}));

function NavButton(props) {
  const { classes, to, label } = props;

  return (
    <Link to={to} className={clsx(classes.navItem, classes.navReset)}>
      <Button>{label}</Button>
    </Link>
  );
}

export default function NavHeader(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.navMenu}>
        <Toolbar>
          <Typography variant="h5" className={classes.navHeader}>
            <Link to="/" className={classes.navReset}>
              Inquests.ca
            </Link>
          </Typography>
          <NavButton classes={classes} to="/authorities" label="Authorities" />
          <NavButton classes={classes} to="/inquests" label="Inquests" />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  );
}
