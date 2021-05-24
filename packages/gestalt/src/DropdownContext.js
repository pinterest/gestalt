// @flow strict
import { createContext, useContext, type Context } from 'react';

type DropdownContextType = {|
  id: string,
  hoveredItem: number,
  setHoveredItem: (n: number) => void,
  setOptionRef?: (?HTMLElement) => void,
|};

const initialContextState = {
  id: '',
  hoveredItem: -1,
  setHoveredItem: () => {},
  setOptionRef: () => {},
};

const context: Context<DropdownContextType> = createContext<DropdownContextType>(
  initialContextState,
);

const useDropdownContext = (): DropdownContextType => {
  const dropdownContextValue = useContext(context);
  return dropdownContextValue;
};

const DropdownContextProvider = context.Provider;
const DropdownContextConsumer = context.Consumer;

export { DropdownContextProvider, DropdownContextConsumer, useDropdownContext };
