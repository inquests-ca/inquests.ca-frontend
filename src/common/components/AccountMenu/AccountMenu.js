import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { signOut } from '../../services/firebase';

const useStyles = makeStyles(theme => ({
  accountMenuIcon: {
    color: theme.palette.primary.main
  }
}));

export default function AccountMenu(props) {
  const [anchor, setAnchor] = useState(null);
  const isOpen = Boolean(anchor);

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  const classes = useStyles();

  return (
    <div className={props.className}>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        className={classes.accountMenuIcon}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}
