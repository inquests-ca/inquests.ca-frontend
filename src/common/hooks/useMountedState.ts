import { useCallback, useEffect, useRef } from 'react';

/**
 * Based on https://dev.to/rodw1995/cancel-your-promises-when-a-component-unmounts-gkl
 * Can be used to check whether a component is currently mounted, and to prevent memory leaks.
 *
 * Example usage:
 *
 *    const isMounted = useMountedState();
 *    useEffect(() => {
 *      const fetchData = async () => {
 *        const response = await fetch('/data');
 *        if (!response.error && isMounted()) setData(response.data);
 *      };
 *      fetchData();
 *    }, [isMounted]);
 */
const useMountedState = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      // The cleanup function of useEffect is called by React on unmount.
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
};

export default useMountedState;
