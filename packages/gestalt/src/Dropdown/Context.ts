import { Context, createContext } from 'react';

type DropdownContextType = {
  id: string;
  hoveredItemIndex: number | null | undefined;
  setHoveredItemIndex: (n: number) => void;
  setOptionRef: (arg1?: HTMLElement | null | undefined) => void;
};

const initialContextState = {
  id: '',
  hoveredItemIndex: -1,
  setHoveredItemIndex: () => {},
  setOptionRef: () => {},
} as const;

const context: Context<DropdownContextType> =
  createContext<DropdownContextType>(initialContextState);

const DropdownContextProvider = context.Provider;
const DropdownContextConsumer = context.Consumer;

export { DropdownContextConsumer, DropdownContextProvider };
