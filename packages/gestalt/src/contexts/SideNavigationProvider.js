// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  type ReactSetStateFunction,
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
  collapsed?: boolean,
  onCollapse?: (boolean) => void,
  shouldCollapseEmpty: boolean,
  setShouldCollapseEmpty: ReactSetStateFunction<boolean>,
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
  collapsed?: boolean,
  onCollapse?: (boolean) => void,
};

const SideNavigationContext: Context<SideNavigationContextType> =
  createContext<SideNavigationContextType>({
    selectedItemId: '',
    setSelectedItemId: () => {},
    selectedMobileChildren: null,
    setSelectedMobileChildren: () => {},
    hideActiveChildren: false,
    setHideActiveChildren: () => {},
    shouldCollapseEmpty: true,
    setShouldCollapseEmpty: () => {},
  });

const { Provider, Consumer: SideNavigationConsumer } = SideNavigationContext;

function SideNavigationProvider({
  children,
  dismissButton,
  collapsed,
  onCollapse,
}: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedMobileChildren, setSelectedMobileChildren] = useState<ReactNode>(null);
  const [hideActiveChildren, setHideActiveChildren] = useState<boolean>(false);
  const [shouldCollapseEmpty, setShouldCollapseEmpty] = useState<boolean>(true);

  const sideNavigationContext = {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    hideActiveChildren,
    setHideActiveChildren,
    dismissButton,
    collapsed,
    onCollapse,
    shouldCollapseEmpty,
    setShouldCollapseEmpty,
  };

  return <Provider value={sideNavigationContext}>{children}</Provider>;
}

function useSideNavigation(): SideNavigationContextType {
  return useContext(SideNavigationContext);
}

export { SideNavigationConsumer, SideNavigationProvider, useSideNavigation };
