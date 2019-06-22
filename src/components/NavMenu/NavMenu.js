import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  navHeader: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit'
  },
  navItem: {
    marginLeft: theme.spacing(4),
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function NavItem(classes, link, label) {
  return (
    <Link to={link} className={classes.navItem}>
      <Button color="inherit">{label}</Button>
    </Link>
  );
}

export default function NavMenu() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <ToolBar>
        <Link to="/" className={classes.navHeader}>
          <Typography variant="h6">Inquests.ca</Typography>
        </Link>
        {NavItem(classes, '/signup', 'Sign Up')}
        {NavItem(classes, '/signin', 'Sign In')}
      </ToolBar>
    </AppBar>
  );
}
