import { type Context, createContext, type ReactNode, useContext } from 'react';

type TableContextType = {
  stickyColumns: number | null | undefined;
};

type Props = {
  children: ReactNode;
  stickyColumns: number | null | undefined;
};

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  stickyColumns: 0,
});

const { Provider } = TableContext;

function TableContextProvider({ children, stickyColumns }: Props) {
  return <Provider value={{ stickyColumns }}>{children}</Provider>;
}

function useTableContext(): TableContextType {
  const { stickyColumns } = useContext(TableContext);
  return { stickyColumns };
}
export { TableContextProvider, useTableContext };
