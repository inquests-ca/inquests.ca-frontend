import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MenuItem, MenuItemValue } from 'common/types';

const useStyles = makeStyles((_theme) => ({
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
  renderValue?: (value: T) => React.ReactNode;
  className?: string;
}

export default function SingleSelect<T extends MenuItemValue>({
  items,
  loading,
  emptyItem,
  selectedValue,
  onChange,
  renderValue,
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
    if (emptyItem) itemElements.unshift(<MuiMenuItem value="" />);
    return itemElements;
  };

  return (
    <FormControl className={className}>
      <Select
        displayEmpty
        value={selectedValue}
        onChange={handleChange}
        renderValue={(value: unknown) =>
          value === undefined
            ? undefined
            : renderValue
            ? renderValue(value as T)
            : items.find((item) => item.value === value)?.label ?? ''
        }
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
