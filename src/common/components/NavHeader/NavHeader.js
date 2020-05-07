import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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

export default function NavHeader(props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navMenu}>
      <Toolbar>
        <Typography variant="h5" className={classes.navHeader}>
          <Link to="/" className={classes.navTextDefault}>
            Inquests.ca
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
