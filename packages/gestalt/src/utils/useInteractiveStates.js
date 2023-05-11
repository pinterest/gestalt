// @flow strict
import { useCallback, useState } from 'react';

/**
 * Returns event handlers that manage state for active, focus and hover states
 * @returns handled states
 */
const useInteractiveStates = (): ({|
  handleOnBlur: () => void,
  handleOnFocus: () => void,
  handleOnMouseDown: () => void,
  handleOnMouseEnter: () => void,
  handleOnMouseLeave: () => void,
  handleOnMouseUp: () => void,
  isActive: boolean,
  isFocused: boolean,
  isHovered: boolean,
|}) => {
  const [isActive, setActive] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleOnBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleOnMouseDown = useCallback(() => {
    setActive(true);
  }, []);

  const handleOnMouseUp = useCallback(() => {
    setActive(false);
  }, []);

  const handleOnMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setActive(false);
    setHovered(false);
  }, []);

  return {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    handleOnMouseLeave,
    handleOnMouseEnter,
    isActive,
    isFocused,
    isHovered,
  };
};

export default useInteractiveStates;
