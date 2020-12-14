import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

import useDefaultState from 'common/hooks/useDefaultState';
import useCallbackOnChange from 'common/hooks/useCallbackOnChange';

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
  const handleSearch = useCallbackOnChange(defaultValue ?? '', onSearch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setText(event.currentTarget.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void =>
    event.key === 'Enter' ? handleSearch(text) : undefined;

  const handleBlur = (): void => (searchOnBlur ? handleSearch(text) : undefined);

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
