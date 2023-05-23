// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

export type NoopType = () => void;

type SheetMobileHandlersType = {|
  sheetMobile?: {| onOpen?: ?NoopType, onClose?: ?NoopType |},
|} | void;

type HandlersContextType = {| ...SheetMobileHandlersType |} | void;

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the EffectsProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * [Custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) wrapping your effects for [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile). Call [useEffect](https://react.dev/reference/react/useEffect#useeffect) to declare an effect.
   */
  sheetMobile?: {| onOpen?: ?NoopType, onClose?: ?NoopType |},
|};

const HandlersContext: Context<HandlersContextType> = createContext<HandlersContextType>();

const { Provider } = HandlersContext;

/**
 * [HandlerProvider](https://gestalt.pinterest.systems/web/utilities/handlerprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows your Gestalt components to.....
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
