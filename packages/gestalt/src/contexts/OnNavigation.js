// @flow strict
import React, { useContext, createContext, type Context, type Element, type Node } from 'react';
import PropTypes from 'prop-types';

type EventHandlerType = ({|
  +event: SyntheticEvent<>,
|}) => void;

type OnNavigationArgs = {|
  href: string,
  target?: null | 'self' | 'blank',
|};

export type OnNavigationType = (OnNavigationArgs) => ?EventHandlerType;

export type CustomOnNavigation = OnNavigationType | 'disabled';

export const CustomOnNavigationPropType: React$PropType$Primitive<CustomOnNavigation> = PropTypes.oneOf(
  [PropTypes.func, 'disabled'],
);

type OnNavigationContextType = {| onNavigation: OnNavigationType |};

type Props = {|
  children: Node,
  onNavigation?: OnNavigationType,
|};

const OnNavigationContext: Context<OnNavigationContextType | void> = createContext<OnNavigationContextType | void>();

const { Provider } = OnNavigationContext;

function OnNavigationProvider({ onNavigation, children }: Props): Element<typeof Provider> {
  return <Provider value={onNavigation ? { onNavigation } : undefined}>{children}</Provider>;
}

function useOnNavigation({ href, target }: OnNavigationArgs): ?EventHandlerType {
  const onNavigationContext = useContext(OnNavigationContext);
  const onNavigationHandler = onNavigationContext?.onNavigation({ href, target });
  return onNavigationHandler;
}

export { OnNavigationProvider, useOnNavigation };

OnNavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigation: PropTypes.func,
};
