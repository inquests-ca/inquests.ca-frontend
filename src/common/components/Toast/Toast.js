import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

// TODO: add other variants (i.e., success, warning, info).
// TODO: center toast text.
const iconVariants = {
  error: ErrorIcon
};

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    marginRight: theme.spacing(1)
  }
}));

export default function Toast(props) {
  const classes = useStyles();

  const { className, message, onClose, variant } = props;

  const Icon = iconVariants[props.variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={
        <IconButton key="close" aria-label="Close" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      }
    />
  );
}

Toast.propTypes = {
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error']).isRequired
};
