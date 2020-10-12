import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import { MenuItem } from 'common/types';

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 200,
  },
  fullWidth: {
    width: '100%',
  },
}));

interface MultiSelectProps {
  items: MenuItem[];
  selectedValues: string[];
  onChange: (value: string[]) => void;
  renderLabel: (value: string[]) => React.ReactNode;
  fullWidth: boolean;
  className?: string;
}

const MultiSelect = ({
  items,
  selectedValues,
  onChange,
  renderLabel,
  fullWidth,
  className,
}: MultiSelectProps) => {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as string[]);

  const classes = useStyles();

  return (
    <FormControl className={fullWidth ? clsx(className, classes.fullWidth) : className}>
      <Select
        className={classes.select}
        multiple
        displayEmpty
        value={selectedValues}
        onChange={handleChange}
        renderValue={(value: unknown) => renderLabel(value as string[])}
      >
        {items.map((item, i) => (
          <MuiMenuItem key={i} value={item.value}>
            <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
            <ListItemText primary={item.label} />
          </MuiMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
