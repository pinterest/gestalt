// @flow strict
import React, { createContext, type Context, useContext } from 'react';

type TableContextType = {|
  stickyColumns?: ?number,
|};

type Props = {|
  children: Node,
  value: Object,
|};

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  stickyColumns: undefined,
});

const { Provider } = TableContext;

function TableContextProvider({ children, value }: Props): Element<typeof Provider> {
  return <Provider value={value}>{children}</Provider>;
}

function useTableContext(): TableContextType {
  const tableContext = useContext(TableContext);
  return tableContext;
}

export { TableContextProvider, useTableContext };
