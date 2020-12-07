import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Option, OptionValue } from 'common/types';

interface SingleSelectProps<T extends OptionValue> {
  options: Option<T>[];
  emptyOption?: boolean;
  selectedValue: T;
  onChange: (value: T) => void;
  renderValue?: (value: T) => React.ReactNode;
  className?: string;
}

export default function SingleSelect<T extends OptionValue>({
  options,
  emptyOption,
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
            : options.find((option) => option.value === value)?.label ?? ''
        }
      >
        {emptyOption && <MenuItem value="" />}
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
