import { Context, createContext } from 'react';

type DropdownContextType = {
  id: string;
  hoveredItemIndex: number | null | undefined;
  setHoveredItemIndex: (n: number | null | undefined) => void;
  setOptionRef: (arg1?: HTMLElement | null | undefined) => void;
  focusedItemIndex: number | null | undefined;
  setFocusedItemIndex: (n: number | null | undefined) => void;
};

const initialContextState = {
  id: '',
  hoveredItemIndex: -1,
  setHoveredItemIndex: () => {},
  setFocusedItemIndex: () => {},
  setOptionRef: () => {},
  focusedItemIndex: -1,
} as const;

const context: Context<DropdownContextType> =
  createContext<DropdownContextType>(initialContextState);

const DropdownContextProvider = context.Provider;
const DropdownContextConsumer = context.Consumer;

export { DropdownContextConsumer, DropdownContextProvider };
