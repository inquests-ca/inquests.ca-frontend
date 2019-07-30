import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function FormTextField(props) {
  const {
    onChange,
    dataKey,
    label,
    name,
    type,
    required,
    autoFocus,
    disabled
  } = props;

  return (
    <TextField
      onChange={event => onChange(dataKey, event.target.value)}
      label={label}
      name={name}
      type={type}
      required={required}
      autoFocus={autoFocus}
      disabled={disabled}
      variant="outlined"
      margin="normal"
      fullWidth
    />
  );
}

FormTextField.propTypes = {
  onChange: PropTypes.func,
  dataKey: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool
};
