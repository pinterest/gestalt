// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

export type NoopType = () => void;

type GlobalEventsHandlerContextType = {|
  sheetMobileHandlers?: {| onOpen?: NoopType, onClose?: NoopType |},
|} | void;

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the GlobalEventsHandlerProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * Handlers consumed by [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile#External-handlers).
   */
  sheetMobileHandlers?: {| onOpen?: NoopType, onClose?: NoopType |},
|};

const GlobalEventsHandlerContext: Context<GlobalEventsHandlerContextType> =
  createContext<GlobalEventsHandlerContextType>();

const { Provider } = GlobalEventsHandlerContext;

/**
 * [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows sharing global event handlers with consuming components.
 */
export default function GlobalEventsHandlerProvider({
  children,
  sheetMobileHandlers,
}: Props): Element<typeof Provider> {
  return <Provider value={{ sheetMobileHandlers }}>{children}</Provider>;
}

export function useGlobalEventsHandlerContext(): GlobalEventsHandlerContextType {
  return useContext(GlobalEventsHandlerContext);
}
