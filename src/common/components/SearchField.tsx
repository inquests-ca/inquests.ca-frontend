import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';

interface SearchFieldProps {
  label: string;
  name: string;
  onSearch: (text: string) => void;
  fullWidth?: boolean;
  className?: string;
}

const SearchField = ({ label, name, onSearch, fullWidth, className }: SearchFieldProps) => {
  const [text, setText] = useState('');
  const prevText = useRef('');

  const handleSearch = (): void => {
    // Only perform search if the text field has changed.
    if (text !== prevText.current) {
      onSearch(text);
      prevText.current = text;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setText(event.currentTarget.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') handleSearch();
  };

  const handleBlur = (): void => handleSearch();

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
