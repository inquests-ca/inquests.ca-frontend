import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  select: {
    width: 200
  }
}));

export default function SingleSelect(props) {
  const { className, items, emptyItem, selectedValue, onChange } = props;

  const handleChange = event => onChange(event.target.value);

  const classes = useStyles();

  return (
    <FormControl className={className}>
      <Select className={classes.select} value={selectedValue} onChange={handleChange}>
        {emptyItem && <MenuItem value="" />}
        {items.map((item, i) => (
          <MenuItem key={i} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SingleSelect.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  emptyItem: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
