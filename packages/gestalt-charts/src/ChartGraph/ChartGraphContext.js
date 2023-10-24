// @flow strict
import { type Context, createContext, type Element, type Node, useContext } from 'react';

type TableContextType = {
  decal: ?'visualPattern' | 'default' | 'disabled',
};

type Props = {
  children: Node,
  decal: ?'visualPattern' | 'default' | 'disabled',
};

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  decal: 'default',
});

const { Provider } = TableContext;

function ChartProvider({ children, decal }: Props): Element<typeof Provider> {
  return <Provider value={{ decal }}>{children}</Provider>;
}

function useChartContext(): TableContextType {
  const { decal } = useContext(TableContext);
  return { decal };
}
export { ChartProvider, useChartContext };
