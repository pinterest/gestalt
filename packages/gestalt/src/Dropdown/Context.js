// @flow strict
import { createContext, type Context } from 'react';

type DropdownContextType = {|
  id: string,
  hoveredItem: number,
  setHoveredItem: (n: number) => void,
  setOptionRef: (?HTMLElement) => void,
|};

const initialContextState = {
  id: '',
  hoveredItem: -1,
  setHoveredItem: () => {},
  setOptionRef: () => {},
};

const context: Context<DropdownContextType> =
  createContext<DropdownContextType>(initialContextState);

const DropdownContextProvider = context.Provider;
const DropdownContextConsumer = context.Consumer;

export { DropdownContextProvider, DropdownContextConsumer };
