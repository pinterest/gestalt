// @flow strict
import { type Context, type Element, type Node, useContext, useState, createContext } from 'react';

type SideNavigationContextType = {|
  selectedItemId: string,
  setSelectedItemId: (string) => void,
|};

type Props = {|
  children: Node,
|};

const SideNavigationContext: Context<SideNavigationContextType> =
  createContext<SideNavigationContextType>({
    selectedItemId: '',
    setSelectedItemId: () => {},
  });

const { Provider } = SideNavigationContext;

function SideNavigationProvider({ children }: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');

  const sideNavigationContext = {
    selectedItemId,
    setSelectedItemId,
  };

  return <Provider value={sideNavigationContext}>{children}</Provider>;
}

function useSideNavigation(): SideNavigationContextType {
  const { selectedItemId, setSelectedItemId } = useContext(SideNavigationContext);
  return { selectedItemId, setSelectedItemId };
}

export { SideNavigationProvider, useSideNavigation };
