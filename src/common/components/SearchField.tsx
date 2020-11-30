import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';

interface SearchFieldProps {
  defaultValue?: string;
  label: string;
  name: string;
  onSearch: (text: string) => void;
  fullWidth?: boolean;
  className?: string;
}

const SearchField = ({
  defaultValue,
  label,
  name,
  onSearch,
  fullWidth,
  className,
}: SearchFieldProps) => {
  const [text, setText] = useState('');
  const prevSearch = useRef('');

  useEffect(() => {
    prevSearch.current = defaultValue ?? '';
    setText(defaultValue ?? '');
  }, [defaultValue]);

  const handleSearch = (): void => {
    // Only perform search if the text field has changed.
    if (text !== prevSearch.current) {
      onSearch(text);
      prevSearch.current = text;
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
      value={text}
      type="search"
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
