import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import { Option, OptionValue } from 'common/types';

const useStyles = makeStyles((_theme) => ({
  fullWidth: {
    width: '100%',
  },
  loading: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

interface MultiSelectProps<T extends OptionValue> {
  options: Option<T>[];
  loading?: boolean;
  selectedValues: T[];
  onChange: (value: T[]) => void;
  renderLabel: (value: T[]) => React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function MultiSelect<T extends OptionValue>({
  options,
  loading,
  selectedValues,
  onChange,
  renderLabel,
  fullWidth,
  className,
}: MultiSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as T[]);

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        multiple
        displayEmpty
        value={selectedValues}
        onChange={handleChange}
        renderValue={(value: unknown) => renderLabel(value as T[])}
      >
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          options.map((option, i) => (
            <MuiMenuItem key={i} value={option.value}>
              <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MuiMenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
