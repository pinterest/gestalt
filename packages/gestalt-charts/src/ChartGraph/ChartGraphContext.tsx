import { Context, createContext, ReactElement, ReactNode, useContext } from 'react';

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

// @ts-expect-error - TS2315 - Type 'Element' is not generic.
function ChartProvider({ children, decal }: Props): Element<typeof Provider> {
  return <Provider value={{ decal }}>{children}</Provider>;
}

function useChartContext(): TableContextType {
  const { decal } = useContext(TableContext);
  return { decal };
}
export { ChartProvider, useChartContext };
