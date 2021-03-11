// @flow strict
import { createContext, type Context } from 'react';

type TableContextType = {|
  stickyColumns?: number,
|};

const initialState = {
  stickyColumns: undefined,
};

const TableContext: Context<TableContextType> = createContext<TableContextType>(initialState);

export default TableContext;
