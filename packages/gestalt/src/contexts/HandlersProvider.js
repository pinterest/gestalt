// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

export type NoopType = () => void;

type SheetMobileHandlersType = {|
  sheetMobile?: {| onOpen?: ?NoopType, onClose?: ?NoopType |},
|} | void;

type HandlersContextType = {| ...SheetMobileHandlersType |} | void;

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the HandlersProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * Handlers consumed by [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile#External-handlers).
   */
  sheetMobile?: {| onOpen?: ?NoopType, onClose?: ?NoopType |},
|};

const HandlersContext: Context<HandlersContextType> = createContext<HandlersContextType>();

const { Provider } = HandlersContext;

/**
 * [HandlerProvider](https://gestalt.pinterest.systems/web/utilities/handlerprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows to share external handlers with consuming components.
 */
export default function HandlerProvider({
  children,
  sheetMobile,
}: Props): Element<typeof Provider> {
  return <Provider value={{ sheetMobile }}>{children}</Provider>;
}

export function useHandlersContext(): HandlersContextType {
  return useContext(HandlersContext);
}
