import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  keyColumn: {
    textAlign: 'right',
    verticalAlign: 'top',
    paddingRight: theme.spacing(1),
    maxWidth: '200px',
  },
  bottomPadded: {
    paddingBottom: theme.spacing(1),
  },
  multiline: {
    // Used so newline characters are rendered.
    whiteSpace: 'pre-line',
  },
}));

interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

interface RowProps {
  name: string;
  children: React.ReactNode;
  compact?: boolean;
}

export const Row = ({ name, children, compact }: RowProps) => {
  const classes = useStyles();

  // Do not display missing data.
  if (!children) return null;

  return (
    <tr>
      <td className={compact ? classes.keyColumn : clsx(classes.keyColumn, classes.bottomPadded)}>
        <b>{name}:</b>
      </td>
      <td className={compact ? '' : classes.bottomPadded}>
        <Typography className={classes.multiline} variant="body2" component="p">
          {children}
        </Typography>
      </td>
    </tr>
  );
};
