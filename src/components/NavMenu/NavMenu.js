import React from 'react';
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
    <Button color="inherit" className={classes.navItem}>
      <Link to={link} className={classes.navLink}>
        {label}
      </Link>
    </Button>
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
