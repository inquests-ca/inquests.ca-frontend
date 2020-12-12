import React from 'react';
import TextField from '@material-ui/core/TextField';

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
      type="search"
      label={label}
      name={name}
      fullWidth={fullWidth}
      className={className}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default SearchField;
