import {useRef, useCallback} from 'react';

const useDebounceCallback = (callback, time = 100) => {
  const timeRef = useRef(null);
  return useCallback(
    (...args) => {
      if (timeRef.current !== null) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = setTimeout(() => {
        clearTimeout(timeRef.current);
        return callback(...args);
      }, time);
    },
    [callback, time],
  );
};

export default useDebounceCallback;
