import { Context, createContext, ReactNode, useContext } from 'react';

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

// @ts-expect-error - TS2315 - Type 'Element' is not generic.
function TableContextProvider({ children, stickyColumns }: Props): Element<typeof Provider> {
  return <Provider value={{ stickyColumns }}>{children}</Provider>;
}

function useTableContext(): TableContextType {
  const { stickyColumns } = useContext(TableContext);
  return { stickyColumns };
}
export { TableContextProvider, useTableContext };
