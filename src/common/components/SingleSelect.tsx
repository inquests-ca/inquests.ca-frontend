import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { MenuItem } from 'common/types';

const useStyles = makeStyles((theme) => ({
  select: {
    width: 200,
  },
}));

interface SingleSelectProps {
  items: MenuItem[];
  emptyItem?: boolean;
  selectedValue: string;
  onChange: (values: string[]) => void;
  className?: string;
}

const SingleSelect = ({
  items,
  emptyItem,
  selectedValue,
  onChange,
  className,
}: SingleSelectProps) => {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(event.target.value as string[]);

  const classes = useStyles();

  return (
    <FormControl className={className}>
      <Select className={classes.select} value={selectedValue} onChange={handleChange}>
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
