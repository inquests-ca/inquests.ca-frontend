import React from 'react';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

// TODO: add other variants (i.e., success, warning, info).
// TODO: center toast text.
const iconVariants = {
  error: ErrorIcon,
  warning: WarningIcon,
};

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    marginRight: theme.spacing(1),
  },
}));

interface ToastProps {
  variant: 'error' | 'warning';
  message: string;
  onClose: () => void;
  className?: string;
}

const Toast = ({ variant, message, onClose, className }: ToastProps) => {
  const classes = useStyles();

  const Icon = iconVariants[variant];

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
};

export default Toast;
