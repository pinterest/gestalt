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
export type onLinkClickContextDataType = {|
  [string]: Node | EventHandlerType,
|};
export type onLinkClickType = ({|
  href: string,
  onLinkClickContextData?: onLinkClickContextDataType,
  event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>,
|}) => void;
type OnLinkClickContextType = {| onLinkClick: onLinkClickType |};

type Props = {|
  children: Node,
  onLinkClick?: onLinkClickType,
  onLinkClickContextData?: onLinkClickContextDataType,
|};

const OnLinkClickContext: Context<OnLinkClickContextType | void> = createContext<OnLinkClickContextType | void>();
const OnLinkClickContextProvider = OnLinkClickContext.Provider;

function OnLinkClickProvider({
  onLinkClick,
  children,
}: Props): Element<typeof OnLinkClickContextProvider> {
  return (
    <OnLinkClickContextProvider
      value={onLinkClick ? { onLinkClick } : undefined}
    >
      {children}
    </OnLinkClickContextProvider>
  );
}

function useOnLinkClick(): OnLinkClickContextType | void {
  return useContext(OnLinkClickContext);
}

export { OnLinkClickProvider, useOnLinkClick };

OnLinkClickProvider.propTypes = {
  children: PropTypes.node,
  onLinkClick: PropTypes.func,
};
