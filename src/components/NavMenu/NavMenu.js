import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function NavMenu() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <ToolBar>
        <Typography variant="h6" className={classes.title}>
          Inquests.ca
        </Typography>
        <Link to="/signin" className={classes.navLink}>
          <Button color="inherit">Sign In</Button>
        </Link>
      </ToolBar>
    </AppBar>
  );
}
