// @flow strict
import { type Context, createContext, type Element, type Node, useContext } from 'react';

export type NoopType = () => void;

type OnLinkNavigationType = ({|
  href: string,
  target?: null | 'self' | 'blank',
|}) => ?({|
  +event: SyntheticEvent<>,
|}) => void;

type GlobalEventsHandlerContextType = {|
  buttonHandlers?: {| onClick?: ({ [string]: string | number }) => void |},
  sheetMobileHandlers?: {| onOpen?: NoopType, onClose?: NoopType |},
  linkHandlers?: {| onNavigation?: OnLinkNavigationType |},
|} | void;

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the GlobalEventsHandlerProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * Handlers consumed by [Button](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#onClick).
   */
  buttonHandlers?: {| onClick?: ({ [string]: string | number }) => void |},
  /**
   * Handlers consumed by [Link](https://gestalt.pinterest.systems/web/link#External-handlers).
   */
  linkHandlers?: {|
    onNavigation?: ({|
      href: string,
      target?: null | 'self' | 'blank',
    |}) => ?({|
      +event: SyntheticEvent<>,
    |}) => void,
  |},
  /**
   * Handlers consumed by [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile#External-handlers).
   */
  sheetMobileHandlers?: {| onOpen?: () => void, onClose?: () => void |},
|};

const GlobalEventsHandlerContext: Context<GlobalEventsHandlerContextType> =
  createContext<GlobalEventsHandlerContextType>();

const { Provider } = GlobalEventsHandlerContext;

/**
 * [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows sharing global event handlers with consuming components.
 */
export default function GlobalEventsHandlerProvider({
  children,
  buttonHandlers,
  sheetMobileHandlers,
  linkHandlers,
}: Props): Element<typeof Provider> {
  return (
    <Provider
      value={{
        buttonHandlers,
        sheetMobileHandlers,
        linkHandlers,
      }}
    >
      {children}
    </Provider>
  );
}

export function useGlobalEventsHandlerContext(): GlobalEventsHandlerContextType {
  return useContext(GlobalEventsHandlerContext);
}
