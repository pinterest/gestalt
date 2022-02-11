// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

export type OnInteractionType = ({|
  componentName: string,
  // $FlowFixMe[unclear-type]
  onInteractionDataObject?: {| [string]: any |},

|}) => ?({|
  +event: SyntheticEvent<>,
|}) => void;

type OnInteractionContextType = {| onInteraction: OnInteractionType |};

type Props = {|
  /**
   *
   */
  children: Node,
  /**
   * If passed, it replaces the default link behavior with custom on navigation behavior. See [custom navigation context](https://gestalt.pinterest.systems/onlinknavigationprovider#Custom-link-navigation-context) variant for examples.
   */
  onInteraction?: OnInteractionType,
|};

const OnInteractionContext: Context<OnInteractionContextType | void> = createContext<OnInteractionContextType | void>();

const { Provider } = OnInteractionContext;

/**
 * [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) is a [React context provider](https://reactjs.org/docs/context.html#contextprovider) to externally control the link behavior of components further down the tree.
 */
export default function OnLinkNavigationProvider({
  children,
  onInteraction,
}: Props): Element<typeof Provider> {
  return <Provider value={onInteraction ? { onInteraction } : undefined}>{children}</Provider>;
}

export function useOnLinkNavigation({
  componentName,
  onInteractionDataObject,
}: {|
  componentName: string,
  // $FlowFixMe[unclear-type]
  onInteractionDataObject?: {| [string]: any |},
|}): ?({|
  +event: SyntheticEvent<>,
|}) => void {
  const onInteractionContext = useContext(OnInteractionContext);
  const onInteractionHandler = onInteractionContext?.onInteraction({
    componentName,
    onInteractionDataObject,
  });
  return onInteractionHandler;
}
