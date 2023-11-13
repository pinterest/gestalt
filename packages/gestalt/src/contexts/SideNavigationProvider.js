// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  useContext,
  useState,
} from 'react';

export interface Indexable {
  index(): number;
}

type SideNavigationContextType = {
  selectedItemId: string,
  setSelectedItemId: (string) => void,
  selectedMobileChildren: ReactNode | null,
  setSelectedMobileChildren: (ReactNode | null) => void,
  hideActiveChildren: boolean,
  setHideActiveChildren: (boolean) => void,
  dismissButton?: {
    accessibilityLabel?: string,
    onDismiss: () => void,
    id: string,
  },
};

type Props = {
  children: ReactNode,
  dismissButton?: {
    accessibilityLabel?: string,
    onDismiss: () => void,
    id: string,
  },
};

const SideNavigationContext: Context<SideNavigationContextType> =
  createContext<SideNavigationContextType>({
    selectedItemId: '',
    setSelectedItemId: () => {},
    selectedMobileChildren: null,
    setSelectedMobileChildren: () => {},
    hideActiveChildren: false,
    setHideActiveChildren: () => {},
  });

const { Provider } = SideNavigationContext;

function SideNavigationProvider({ children, dismissButton }: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedMobileChildren, setSelectedMobileChildren] = useState<ReactNode>(null);
  const [hideActiveChildren, setHideActiveChildren] = useState<boolean>(false);

  const sideNavigationContext = {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    hideActiveChildren,
    setHideActiveChildren,
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
    hideActiveChildren,
    setHideActiveChildren,
    dismissButton,
  } = useContext(SideNavigationContext);
  return {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    hideActiveChildren,
    setHideActiveChildren,
    dismissButton,
  };
}

export { SideNavigationProvider, useSideNavigation };
