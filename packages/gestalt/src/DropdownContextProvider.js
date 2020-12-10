// @flow strict
import { createContext, type Context } from 'react';

type DropdownContextType = {|
  hoveredItem: number | null,
  setHoveredItem: ((n: number) => void) | null,
  setOptionRef: ((?HTMLElement) => void) | null,
|};

const initialState = {
  hoveredItem: null,
  setHoveredItem: null,
  setOptionRef: null,
};

const DropdownContext: Context<DropdownContextType> = createContext<DropdownContextType>(
  initialState
);

export default DropdownContext;
