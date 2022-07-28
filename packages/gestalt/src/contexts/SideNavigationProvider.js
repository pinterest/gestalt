// @flow strict
import { type Context, type Element, type Node, useContext, useState, createContext } from 'react';

export interface Indexable {
  index(): number;
}

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

type SideNavigationContextType = {|
  selectedItemId: string,
  setSelectedItemId: (string) => void,
  selectedMobileChildren: Node | null,
  setSelectedMobileChildren: (Node | null) => void,
  dismissButton?: {|
    accessibilityLabel?: string,
    onDismiss: () => void,
    tooltip: TooltipProps,
  |},
|};

type Props = {|
  children: Node,
  dismissButton?: {| accessibilityLabel?: string, onDismiss: () => void, tooltip: TooltipProps |},
|};

const SideNavigationContext: Context<SideNavigationContextType> =
  createContext<SideNavigationContextType>({
    selectedItemId: '',
    setSelectedItemId: () => {},
    selectedMobileChildren: null,
    setSelectedMobileChildren: () => {},
  });

const { Provider } = SideNavigationContext;

function SideNavigationProvider({ children, dismissButton }: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedMobileChildren, setSelectedMobileChildren] = useState(null);

  const sideNavigationContext = {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    dismissButton,
  };

  return <Provider value={sideNavigationContext}>{children}</Provider>;
}

function useSideNavigation(): SideNavigationContextType {
  const {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    dismissButton,
  } = useContext(SideNavigationContext);
  return {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    dismissButton,
  };
}

export { SideNavigationProvider, useSideNavigation };
