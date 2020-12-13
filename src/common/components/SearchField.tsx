import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

import useDefaultState from 'common/hooks/useDefaultState';

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
  const [text, setText, handleSearch] = useDefaultState(defaultValue ?? '', onSearch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setText(event.currentTarget.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void =>
    event.key === 'Enter' ? handleSearch() : undefined;

  const handleBlur = (): void => handleSearch();

  return (
    <TextField
      value={text}
      variant="outlined"
      type="search"
      placeholder={label}
      name={name}
      fullWidth={fullWidth}
      className={className}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
