// @flow strict
import { createContext, type Context } from 'react';

type DropdownContextType = {|
  hoveredItem: number,
  setHoveredItem: (n: number) => void,
  setOptionRef: (?HTMLElement) => void,
|};

const initialState = {
  hoveredItem: -1,
  setHoveredItem: () => {},
  setOptionRef: () => {},
};

const DropdownContext: Context<DropdownContextType> = createContext<DropdownContextType>(
  initialState
);

export default DropdownContext;
