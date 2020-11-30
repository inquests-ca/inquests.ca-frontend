import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import { MenuItemGroup } from 'common/types';

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

interface NestedMultiSelectProps {
  items: MenuItemGroup[];
  loading?: boolean;
  defaultValues?: string[];
  onSelect: (value: string[]) => void;
  renderLabel: (value: string[]) => React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

// TODO: achieve nesting with submenus rather than headers.
const NestedMultiSelect = ({
  items,
  loading,
  defaultValues,
  onSelect,
  renderLabel,
  fullWidth,
  className,
}: NestedMultiSelectProps) => {
  const [values, setValues] = useState<string[]>([]);
  const prevValues = useRef<string[]>([]);

  useEffect(() => {
    prevValues.current = defaultValues ?? [];
    setValues(defaultValues ?? []);
  }, [defaultValues]);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    // Clicking a ListSubheader element also causes tihs event to be fired off with value undefined.
    // Discard these events.
    const selectedValues = event.target.value as string[];
    if (selectedValues.some((value) => value === undefined)) event.preventDefault();
    else setValues(selectedValues);
  };

  const handleClose = () => {
    // Only execute callback if values have changed.
    if (values !== prevValues.current) {
      onSelect(values);
      prevValues.current = values;
    }
  };

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        multiple
        displayEmpty
        value={values}
        onChange={handleChange}
        onClose={handleClose}
        renderValue={(value: unknown) => renderLabel(value as string[])}
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
          items.map((group, i) => [
            <ListSubheader key={i} disableSticky>
              {group.label}
            </ListSubheader>,
            group.items.map((item, i) => (
              <MenuItem key={i} value={item.value}>
                <Checkbox checked={values.indexOf(item.value) > -1} />
                <ListItemText primary={item.label} />
              </MenuItem>
            )),
          ])
        )}
      </Select>
    </FormControl>
  );
};

export default NestedMultiSelect;
