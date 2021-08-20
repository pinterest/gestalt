// @flow strict
import { useState } from 'react';

// Forked from https://usehooks.com/useLocalStorage/
export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (((T) => T) | T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      // If error also return initialValue
      // eslint-disable-next-line no-console
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        // $FlowIssue[prop-missing]
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
