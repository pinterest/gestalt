// @flow strict
import { type Context, createContext, type Element, type Node, useContext } from 'react';

type TableContextType = {|
  stickyColumns: ?number,
|};

type Props = {|
  children: Node,
  stickyColumns: ?number,
|};

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  stickyColumns: 0,
});

const { Provider } = TableContext;

function TableContextProvider({ children, stickyColumns }: Props): Element<typeof Provider> {
  return <Provider value={{ stickyColumns }}>{children}</Provider>;
}

function useTableContext(): TableContextType {
  const { stickyColumns } = useContext(TableContext);
  return { stickyColumns };
}
export { TableContextProvider, useTableContext };
