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

import { MenuItemGroup } from 'common/types';

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

interface NestedMultiSelectProps {
  items: MenuItemGroup[];
  loading?: boolean;
  selectedValues: string[];
  onChange: (value: string[]) => void;
  renderLabel: (value: string[]) => React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

// TODO: achieve nesting with submenus rather than headers.
const NestedMultiSelect = ({
  items,
  loading,
  selectedValues,
  onChange,
  renderLabel,
  fullWidth,
  className,
}: NestedMultiSelectProps) => {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    // Clicking a ListSubheader element also causes tihs event to be fired off with value undefined.
    // Discard these events.
    const selectedItems = event.target.value as string[];
    if (selectedItems.some((value) => value === undefined)) event.preventDefault();
    else onChange(selectedItems);
  };

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        multiple
        displayEmpty
        value={selectedValues}
        onChange={handleChange}
        renderValue={(value: unknown) => renderLabel(value as string[])}
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
                <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
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
