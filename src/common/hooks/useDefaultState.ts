import { useState, useEffect } from 'react';

/**
 * Returns a stateful value and a function to update it. Unlike useState, the default value can
 * change dynamically.
 */
const useDefaultState = <T>(defaultValue: T): [T, (arg: T) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return [value, setValue];
};

export default useDefaultState;
