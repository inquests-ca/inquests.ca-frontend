import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { MenuItem } from 'common/types';

interface SingleSelectProps {
  items: MenuItem[];
  emptyItem?: boolean;
  selectedValue: string;
  onChange: (value: string) => void;
  renderValue?: (value: string) => React.ReactNode;
  className?: string;
}

const SingleSelect = ({
  items,
  emptyItem,
  selectedValue,
  onChange,
  renderValue,
  className,
}: SingleSelectProps) => {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as string);

  return (
    <FormControl className={className}>
      <Select
        displayEmpty
        value={selectedValue}
        onChange={handleChange}
        renderValue={(value: unknown) =>
          renderValue ? renderValue(value as string) : (value as string)
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
};

export default SingleSelect;
