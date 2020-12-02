import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

/**
 * Returns a stateful value, a function to update it, and a function which invokes the given
 * callback only when the stateful value has changed.
 *
 * @param defaultValue Dynamically changing default value.
 * @param callback Invoked when the returned handler function is called and the stateful value has since changed.
 */
const useDefaultState = <T>(
  defaultValue: T,
  callback: (value: T) => void
): [T, (arg: T) => void, () => void] => {
  const [value, setValue] = useState(defaultValue);
  const prevValue = useRef(defaultValue);

  useEffect(() => {
    prevValue.current = defaultValue;
    setValue(defaultValue);
  }, [defaultValue]);

  const handler = (): void => {
    // Only invoke callback if value has changed since last callback invocation.
    if (!_.isEqual(value, prevValue.current)) {
      prevValue.current = value;
      callback(value);
    }
  };

  return [value, setValue, handler];
};

export default useDefaultState;
