// @flow strict
import type { Context, Element, Node } from 'react';

import { useContext, createContext } from 'react';
import PropTypes from 'prop-types';

type EventHandlerType = ({|
  +event: SyntheticEvent<>,
|}) => void;

type OnLinkNavigationArgs = {|
  href: string,
  target?: null | 'self' | 'blank',
|};

export type OnLinkNavigationType = (OnLinkNavigationArgs) => ?EventHandlerType;

type OnLinkNavigationContextType = {| onNavigation: OnLinkNavigationType |};

type Props = {|
  children: Node,
  onNavigation: OnLinkNavigationType,
|};

const OnLinkNavigationContext: Context<OnLinkNavigationContextType | void> = createContext<OnLinkNavigationContextType | void>();

const { Provider } = OnLinkNavigationContext;

/**
 * https://gestalt.pinterest.systems/OnLinkNavigationProvider
 */
export default function OnLinkNavigationProvider({
  onNavigation,
  children,
}: Props): Element<typeof Provider> {
  return <Provider value={onNavigation ? { onNavigation } : undefined}>{children}</Provider>;
}

export function useOnLinkNavigation({ href, target }: OnLinkNavigationArgs): ?EventHandlerType {
  const onLinkNavigationContext = useContext(OnLinkNavigationContext);
  const onLinkNavigationHandler = onLinkNavigationContext?.onNavigation({ href, target });
  return onLinkNavigationHandler;
}

OnLinkNavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigation: PropTypes.func,
};
