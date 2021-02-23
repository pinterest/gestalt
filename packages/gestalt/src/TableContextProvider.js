// @flow strict
import { createContext, type Context } from 'react';

type TableContextType = {|
  stickyColumn?: number,
  stickyInclusive?: boolean,
|};

const initialState = {
  stickyColumn: -1,
};

const TableContext: Context<TableContextType> = createContext<TableContextType>(initialState);

export default TableContext;
