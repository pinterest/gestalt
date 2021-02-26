// @flow strict
import React, { useContext, createContext, type Context, type Element, type Node } from 'react';
import PropTypes from 'prop-types';

// Duplicated code form packages/gestalt/src/AbstractEventHandler.js
type AbstractEventHandler<T: SyntheticEvent<HTMLElement> | Event, U = {||}> = ({|
  ...U,
  +event: T,
|}) => void;

type EventHandlerType = ({|
  +event: SyntheticEvent<>,
|}) => void;

type OnNavigationArgs = {|
  href: string,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  >,
  target?: null | 'self' | 'blank',
|};

export type OnNavigationType = (OnNavigationArgs) => ?EventHandlerType;

export const OnNavigationPropType: React$PropType$Primitive<OnNavigationType> =
  // $FlowFixMe[incompatible-type]
  PropTypes.func;

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

function useOnNavigation({ href, onClick, target }: OnNavigationArgs): ?EventHandlerType {
  const onNavigationContext = useContext(OnNavigationContext);
  const onNavigationHandler = onNavigationContext?.onNavigation({ href, onClick, target });
  return onNavigationHandler;
}

export { OnNavigationProvider, useOnNavigation };

OnNavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigation: PropTypes.func,
};
