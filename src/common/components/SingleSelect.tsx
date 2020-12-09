import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { MenuItem, MenuItemValue } from 'common/types';

interface SingleSelectProps<T extends MenuItemValue> {
  items: MenuItem<T>[];
  emptyItem?: boolean;
  selectedValue: T;
  onChange: (value: T) => void;
  renderValue?: (value: T) => React.ReactNode;
  className?: string;
}

export default function SingleSelect<T extends MenuItemValue>({
  items,
  emptyItem,
  selectedValue,
  onChange,
  renderValue,
  className,
}: SingleSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as T);

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
        {emptyItem && <MuiMenuItem value="" />}
        {items.map((item, i) => (
          <MuiMenuItem key={i} value={item.value}>
            {item.label}
          </MuiMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
