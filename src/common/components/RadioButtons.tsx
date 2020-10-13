import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { MenuItem } from 'common/types';

interface RadioButtonProps {
  legend: string;
  items: MenuItem[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioButtons = ({ legend, items, selectedValue, onChange, className }: RadioButtonProps) => {
  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) =>
    onChange(value);

  return (
    <div className={className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{legend}</FormLabel>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {items.map((item, i) => (
            <FormControlLabel key={i} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButtons;
