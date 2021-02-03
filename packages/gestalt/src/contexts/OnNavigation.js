// @flow strict
import React, { useContext, createContext, type Context, type Element, type Node } from 'react';
import PropTypes from 'prop-types';

type EventHandlerType = ({|
  +event: SyntheticEvent<>,
|}) => void;
export type onNavigationOptionsType = {|
  [string]: Node | EventHandlerType,
|};
export type onNavigationType = ({|
  href: string,
  event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>,
  onNavigationOptions?: onNavigationOptionsType,
|}) => void;
type OnNavigationType = {| onNavigation: onNavigationType |};

type Props = {|
  children: Node,
  onNavigation?: onNavigationType,
  onNavigationOptions?: onNavigationOptionsType,
|};

const OnNavigation: Context<OnNavigationType | void> = createContext<OnNavigationType | void>();
const { Provider } = OnNavigation;

function OnNavigationProvider({ onNavigation, children }: Props): Element<typeof Provider> {
  return <Provider value={onNavigation ? { onNavigation } : undefined}>{children}</Provider>;
}

function useOnNavigation(): OnNavigationType | void {
  return useContext(OnNavigation);
}

export { OnNavigationProvider, useOnNavigation };

OnNavigationProvider.propTypes = {
  children: PropTypes.node,
  onNavigation: PropTypes.func,
};
