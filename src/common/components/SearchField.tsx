import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export interface SearchFieldProps {
  label: string;
  name: string;
  onSearch: (text: string) => void;
  className?: string;
  fullWidth?: boolean;
}

const SearchField = ({ label, name, onSearch, className, fullWidth }: SearchFieldProps) => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setText(event.currentTarget.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') onSearch(text);
  };

  const handleBlur = (): void => onSearch(text);

  return (
    <TextField
      type={'search'}
      label={label}
      name={name}
      className={className}
      fullWidth={fullWidth}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default SearchField;