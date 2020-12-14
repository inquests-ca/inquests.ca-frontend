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
  searchOnBlur?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const SearchField = ({
  defaultValue,
  label,
  name,
  onSearch,
  searchOnBlur,
  fullWidth,
  className,
}: SearchFieldProps) => {
  const [text, setText] = useDefaultState(defaultValue ?? '');

  const handleSearch = (): void => (text !== defaultValue ? onSearch(text) : undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setText(event.currentTarget.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void =>
    event.key === 'Enter' ? handleSearch() : undefined;

  const handleBlur = (): void => (searchOnBlur ? handleSearch() : undefined);

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
