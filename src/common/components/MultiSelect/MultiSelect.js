import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: 200
  },
  fullWidth: {
    width: '100%'
  }
}));

export default function MultiSelect(props) {
  const { className, items, selectedValues, onChange, renderLabel, fullWidth } = props;

  const handleChange = event => onChange(event.target.value);

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        className={classes.select}
        multiple
        displayEmpty
        value={selectedValues}
        onChange={handleChange}
        renderValue={renderLabel}
      >
        {items.map((item, i) => (
          <MenuItem key={i} value={item.value}>
            <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  renderLabel: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool
};
