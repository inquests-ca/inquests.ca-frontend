import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import useDefaultState from 'common/hooks/useDefaultState';
import { OptionGroup, OptionValue } from 'common/types';

const useStyles = makeStyles((_theme) => ({
  fullWidth: {
    width: '100%',
  },
  menu: {
    maxHeight: '40%',
  },
  loading: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

interface NestedMultiSelectProps<T extends OptionValue> {
  options: OptionGroup<T>[];
  loading?: boolean;
  defaultValues?: T[];
  onSelect: (value: T[]) => void;
  renderLabel: (value: T[]) => React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

// TODO: achieve nesting with submenus rather than headers.
export default function NestedMultiSelect<T extends OptionValue>({
  options,
  loading,
  defaultValues,
  onSelect,
  renderLabel,
  fullWidth,
  className,
}: NestedMultiSelectProps<T>) {
  const [values, setValues, handleSelect] = useDefaultState(defaultValues ?? [], onSelect);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    // Clicking a ListSubheader element also causes tihs event to be fired off with value undefined.
    // Discard these events.
    const selectedValues = event.target.value as T[];
    if (selectedValues.some((value) => value === undefined)) event.preventDefault();
    else setValues(selectedValues);
  };

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        multiple
        displayEmpty
        value={values}
        onChange={handleChange}
        onClose={handleSelect}
        renderValue={(value: unknown) => renderLabel(value as T[])}
        MenuProps={{
          classes: { paper: classes.menu },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          options.map((group, i) => [
            <ListSubheader key={i} disableSticky>
              {group.label}
            </ListSubheader>,
            group.options.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                <Checkbox checked={values.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            )),
          ])
        )}
      </Select>
    </FormControl>
  );
}
