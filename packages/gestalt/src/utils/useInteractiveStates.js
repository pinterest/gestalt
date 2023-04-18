// @flow strict
import { useState } from 'react';

/**
 * Returns event handlers that manage state for active, focus and hover states
 * @returns handled states
 */
const useInteractiveStates = (): ({
  handleOnBlur: () => void,
  handleOnFocus: () => void,
  handleOnMouseDown: () => void,
  handleOnMouseEnter: () => void,
  handleOnMouseLeave: () => void,
  handleOnMouseUp: () => void,
  isActive: boolean,
  isFocused: boolean,
  isHovered: boolean,
}) => {
  const [isActive, setActive] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleOnBlur = () => {
    setFocused(false);
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnMouseDown = () => {
    setActive(true);
  };

  const handleOnMouseUp = () => {
    setActive(false);
  };

  const handleOnMouseEnter = () => {
    setHovered(true);
  };

  const handleOnMouseLeave = () => {
    setActive(false);
    setHovered(false);
  };

  return {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    handleOnMouseLeave,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isActive,
    isFocused,
    isHovered,
  };
};

export default useInteractiveStates;
