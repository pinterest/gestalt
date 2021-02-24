// @flow strict
import { createContext, type Context } from 'react';

type TableContextType = {|
  stickyColumn?: number,
|};

const initialState = {
  stickyColumn: -1,
};

const TableContext: Context<TableContextType> = createContext<TableContextType>(initialState);

export default TableContext;
