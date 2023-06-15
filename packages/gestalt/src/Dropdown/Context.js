// @flow strict
import { type Context, createContext } from 'react';

type DropdownContextType = {|
  id: string,
  hoveredItemIndex: ?number,
  setHoveredItemIndex: (n: number) => void,
  setOptionRef: (?HTMLElement) => void,
|};

const initialContextState = {
  id: '',
  hoveredItemIndex: -1,
  setHoveredItemIndex: () => {},
  setOptionRef: () => {},
};

const context: Context<DropdownContextType> =
  createContext<DropdownContextType>(initialContextState);

const DropdownContextProvider = context.Provider;
const DropdownContextConsumer = context.Consumer;

export { DropdownContextConsumer, DropdownContextProvider };
