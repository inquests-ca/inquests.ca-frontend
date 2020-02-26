import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: 200,
    maxWidth: 300
  }
}));

export default function MultiSelect(props) {
  const { className, items, selected, handleItemSelected, renderLabel } = props;

  const classes = useStyles();

  return (
    <FormControl className={className}>
      <Select
        className={classes.select}
        multiple
        displayEmpty
        value={selected}
        onChange={handleItemSelected}
        renderValue={renderLabel}
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={selected.indexOf(item.value) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleItemSelected: PropTypes.func.isRequired,
  renderLabel: PropTypes.func.isRequired
};
