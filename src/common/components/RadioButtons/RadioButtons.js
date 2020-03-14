import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtons(props) {
  const { className, items, selectedValue, onChange, legend } = props;

  const handleChange = event => onChange(event.target.value);

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
}

RadioButtons.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  legend: PropTypes.string
};
