import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { signOut } from '../../services/firebase';

const useStyles = makeStyles(theme => ({
  accountMenuIcon: {
    color: theme.palette.primary.main
  },
  // TODO: Add styling for profile menu item to prevent ripples.
  accountProfileMenuItem: {
    padding: theme.spacing(2)
  }
}));

// TODO: display name in Profile menu rather than email.
export default function AccountMenu(props) {
  const [anchor, setAnchor] = useState(null);
  const isOpen = Boolean(anchor);

  const { className, currentUser } = props;

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  const classes = useStyles();

  return (
    <div className={className}>
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
        transformOrigin={{
          // TODO: calculate this value.
          vertical: -55,
          horizontal: 'left'
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <Typography className={classes.accountProfileMenuItem} variant="body1">
          {currentUser.email}
        </Typography>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}

AccountMenu.propTypes = {
  currentUser: PropTypes.object.isRequired
};
