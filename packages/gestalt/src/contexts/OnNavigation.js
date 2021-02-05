// @flow strict
import React, { useContext, createContext, type Context, type Element, type Node } from 'react';
import PropTypes from 'prop-types';

type EventHandlerType = ({|
  +event: SyntheticEvent<>,
|}) => void;

export type OnNavigationOptionsType = {|
  +[string]: Node | EventHandlerType,
|};

export const OnNavigationOptionsPropType: React$PropType$Primitive<{| +[string]: * |}> =
  PropTypes.object;

type OnNavigationArgs = {|
  href: string,
  onNavigationOptions?: OnNavigationOptionsType,
  target?: null | 'self' | 'blank',
|};

export type OnNavigationType = ({|
  href: string,
  onNavigationOptions?: OnNavigationOptionsType,
|}) => ?EventHandlerType;

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

const noop = () => {};

function useOnNavigation({ href, onNavigationOptions }: OnNavigationArgs): EventHandlerType {
  const { onNavigation } = useContext(OnNavigationContext) ?? {};

  return onNavigation?.({ href, onNavigationOptions }) ?? noop;
}

export { OnNavigationProvider, useOnNavigation };

OnNavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigation: PropTypes.func,
};
