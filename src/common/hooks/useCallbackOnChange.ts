import { useEffect, useRef } from 'react';
import _ from 'lodash';

/**
 * Return a function which will invoke the input function only if called with a different value from
 * the default value and that of the last invocation.
 */
// TODO: return boolean function instead.
const useCallbackOnChange = <T>(
  defaultValue: T,
  func: (value: T) => void
): ((value: T) => void) => {
  const prevValue = useRef(defaultValue);

  useEffect(() => {
    prevValue.current = defaultValue;
  }, [defaultValue]);

  const wrapper = (value: T): void => {
    if (!_.isEqual(value, prevValue.current)) {
      prevValue.current = value;
      func(value);
    }
  };

  return wrapper;
};

export default useCallbackOnChange;
