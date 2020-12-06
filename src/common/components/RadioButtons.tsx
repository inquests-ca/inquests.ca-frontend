import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Option } from 'common/types';

interface RadioButtonProps<T extends string> {
  legend?: string;
  options: Option<T>[];
  selectedValue: string;
  onChange: (value: T) => void;
  className?: string;
}

export default function RadioButtons<T extends string>({
  legend,
  options,
  selectedValue,
  onChange,
  className,
}: RadioButtonProps<T>) {
  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) =>
    onChange(value as T);

  return (
    <div className={className}>
      <FormControl component="fieldset">
        {legend && <FormLabel component="legend">{legend}</FormLabel>}
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {options.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
