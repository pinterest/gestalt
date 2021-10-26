import type { Context, Node } from "react";
import { createContext, useContext } from "react";
type TableContextType = {
  stickyColumns: number | null | undefined;
};
type Props = {
  children: Node;
  stickyColumns: number | null | undefined;
};
const TableContext: Context<TableContextType> = createContext<TableContextType>(
  {
    stickyColumns: 0,
  }
);
const { Provider } = TableContext;

function TableContextProvider({ children, stickyColumns }: Props): Node {
  return (
    <Provider
      value={{
        stickyColumns,
      }}
    >
      {children}
    </Provider>
  );
}

function useTableContext(): TableContextType {
  const { stickyColumns } = useContext(TableContext);
  return {
    stickyColumns,
  };
}

export { TableContextProvider, useTableContext };