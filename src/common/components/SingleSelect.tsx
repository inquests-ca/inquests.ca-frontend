import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import { MenuItem, MenuItemValue } from 'common/types';

const useStyles = makeStyles((_theme) => ({
  menu: {
    maxHeight: '40%',
  },
  loading: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

interface SingleSelectProps<T extends MenuItemValue> {
  items: MenuItem<T>[];
  loading?: boolean;
  emptyItem?: boolean;
  selectedValue: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

export default function SingleSelect<T extends MenuItemValue>({
  items,
  loading,
  emptyItem,
  selectedValue,
  onChange,
  label,
  className,
}: SingleSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as T);

  const classes = useStyles();

  const renderMenuItems = () => {
    if (items.length === 0) return null;
    const itemElements = items.map((item, i) => (
      <MuiMenuItem key={i} value={item.value}>
        {item.label}
      </MuiMenuItem>
    ));
    if (emptyItem)
      itemElements.unshift(
        <MuiMenuItem key={-1} value="">
          <em>None</em>
        </MuiMenuItem>
      );
    return itemElements;
  };

  return (
    <FormControl className={className}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={selectedValue}
        onChange={handleChange}
        MenuProps={{ classes: { paper: classes.menu } }}
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
