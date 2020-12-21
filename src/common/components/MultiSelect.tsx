import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';

import { MenuItem, MenuItemGroup, MenuItemValue } from 'common/types';

const useStyles = makeStyles((_theme) => ({
  loading: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

interface MultiSelectProps<T extends MenuItemValue> {
  items: MenuItem<T>[] | MenuItemGroup<T>[];
  loading?: boolean;
  selectedValues: T[];
  onChange: (value: T[]) => void;
  renderValues: (value: T[]) => React.ReactNode;
  label?: string;
  className?: string;
}

export default function MultiSelect<T extends MenuItemValue>({
  items,
  loading,
  selectedValues,
  onChange,
  renderValues,
  label,
  className,
}: MultiSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // Clicking a ListSubheader element also causes tihs event to be fired off with value undefined.
    // Discard these events.
    const values = event.target.value as T[];
    if (values.some((value) => value === undefined)) event.preventDefault();
    else onChange(values);
  };

  const classes = useStyles();

  const renderMenuItems = () => {
    if (items.length === 0) return null;
    else if ((items[0] as any).header === undefined) {
      // items is type MenuItem<T>[]
      return (items as MenuItem<T>[]).map((item, i) => (
        <MuiMenuItem key={i} value={item.value}>
          <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
          <ListItemText primary={item.label} />
        </MuiMenuItem>
      ));
    } else {
      // items is type MenuItemGroup<T>[]
      return (items as MenuItemGroup<T>[]).map((group, i) => [
        <ListSubheader key={i} disableSticky>
          {group.header}
        </ListSubheader>,
        ...group.items.map((item, j) => (
          <MuiMenuItem key={`${i}-${j}`} value={item.value}>
            <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
            <ListItemText primary={item.label} />
          </MuiMenuItem>
        )),
      ]);
    }
  };

  return (
    <FormControl className={className}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(value: unknown) => renderValues(value as T[])}
        // Prevents menu from scrolling upon selection and constrains height.
        MenuProps={{
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
          renderMenuItems()
        )}
      </Select>
    </FormControl>
  );
}
