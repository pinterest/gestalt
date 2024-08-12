import { type Context, createContext, type ReactNode, useContext } from 'react';

type TableContextType = {
  decal: 'visualPattern' | null | undefined | 'default' | 'disabled';
};

type Props = {
  children: ReactNode;
  decal: 'visualPattern' | null | undefined | 'default' | 'disabled';
};

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  decal: 'default',
});

const { Provider } = TableContext;

function ChartProvider({ children, decal }: Props) {
  return <Provider value={{ decal }}>{children}</Provider>;
}

function useChartContext(): TableContextType {
  const { decal } = useContext(TableContext);
  return { decal };
}
export { ChartProvider, useChartContext };
