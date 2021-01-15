// @flow strict
import React, {
  useContext,
  createContext,
  type Context,
  type Element,
  type Node,
} from 'react';
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
type OnNavigationContextType = {| onNavigation: onNavigationType |};

type Props = {|
  children: Node,
  onNavigation?: onNavigationType,
  onNavigationOptions?: onNavigationOptionsType,
|};

const OnNavigationContext: Context<OnNavigationContextType | void> = createContext<OnNavigationContextType | void>();
const OnNavigationContextProvider = OnNavigationContext.Provider;

function OnNavigationProvider({
  onNavigation,
  children,
}: Props): Element<typeof OnNavigationContextProvider> {
  return (
    <OnNavigationContextProvider
      value={onNavigation ? { onNavigation } : undefined}
    >
      {children}
    </OnNavigationContextProvider>
  );
}

function useOnNavigation(): OnNavigationContextType | void {
  return useContext(OnNavigationContext);
}

export { OnNavigationProvider, useOnNavigation };

OnNavigationProvider.propTypes = {
  children: PropTypes.node,
  onNavigation: PropTypes.func,
};
