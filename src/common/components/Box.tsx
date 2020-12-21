import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  box: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  loading: {
    padding: theme.spacing(2),
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

interface BoxProps {
  children: React.ReactNode;
  label?: string;
  loading?: boolean;
  className?: string;
}

const Box = ({ children, label, loading, className }: BoxProps) => {
  const classes = useStyles();

  return (
    <div>
      {label && (
        <Typography color="textSecondary" component="span" variant="body2">
          {label}
        </Typography>
      )}
      {loading ? (
        <div className={clsx(classes.loading, classes.box)}>
          <CircularProgress />
        </div>
      ) : (
        <div className={clsx(className, classes.box)}>{children}</div>
      )}
    </div>
  );
};

export default Box;
