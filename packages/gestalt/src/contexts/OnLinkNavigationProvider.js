// @flow strict
import { type Context, createContext, type Element, type Node, useContext } from 'react';

export type OnLinkNavigationType = ({|
  href: string,
  target?: null | 'self' | 'blank',
|}) => ?({|
  +event: SyntheticEvent<>,
|}) => void;

type OnLinkNavigationContextType = {| onNavigation: OnLinkNavigationType |};

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the OnLinkNavigationProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * If passed, it replaces the default link behavior with custom on navigation behavior. See [custom navigation context](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider#Custom-link-navigation-context) variant for examples.
   */
  onNavigation?: OnLinkNavigationType,
|};

const OnLinkNavigationContext: Context<OnLinkNavigationContextType | void> =
  createContext<OnLinkNavigationContextType | void>();

const { Provider } = OnLinkNavigationContext;

/**
 * [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) is a [React context provider](https://reactjs.org/docs/context.html#contextprovider) to externally control the link behavior of components further down the tree.
 *
 * **NOTE** OnLinkNavigationProvider is soon to be deprecated, use [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) instead.**NOTE**
 */
export default function OnLinkNavigationProvider({
  children,
  onNavigation,
}: Props): Element<typeof Provider> {
  return <Provider value={onNavigation ? { onNavigation } : undefined}>{children}</Provider>;
}

export function useOnLinkNavigation({
  href,
  target,
}: {|
  href: string,
  target?: null | 'self' | 'blank',
|}): ?({|
  +event: SyntheticEvent<>,
|}) => void {
  const onLinkNavigationContext = useContext(OnLinkNavigationContext);
  const onLinkNavigationHandler = onLinkNavigationContext?.onNavigation({ href, target });
  return onLinkNavigationHandler;
}
