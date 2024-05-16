import { Context, createContext, ReactElement, ReactNode, useContext, useState } from 'react';

export interface Indexable {
  index(): number;
}

type SideNavigationContextType = {
  selectedItemId: string;
  setSelectedItemId: (arg1: string) => void;
  selectedMobileChildren: ReactNode | null;
  setSelectedMobileChildren: (arg1: ReactNode | null) => void;
  hideActiveChildren: boolean;
  setHideActiveChildren: (arg1: boolean) => void;
  overlayPreview: boolean;
  setOverlayPreview: (arg1: boolean) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (arg1: boolean) => void;
  transitioning?: boolean;
  setTransitioning: (arg1: boolean) => void;
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
    id: string;
  };
};

type Props = {
  children: ReactNode;
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
    id: string;
  };
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (arg1: boolean) => void;
  onPreview?: (arg1: boolean) => void;
};

const SideNavigationContext: Context<SideNavigationContextType> =
  createContext<SideNavigationContextType>({
    selectedItemId: '',
    setSelectedItemId: () => {},
    selectedMobileChildren: null,
    setSelectedMobileChildren: () => {},
    hideActiveChildren: false,
    setHideActiveChildren: () => {},
    overlayPreview: false,
    setOverlayPreview: () => {},
    setTransitioning: () => {},
  });

const { Provider, Consumer: SideNavigationConsumer } = SideNavigationContext;

function SideNavigationProvider({
  children,
  dismissButton,
  collapsible,
  collapsed,
  onCollapse: onCollapseProp,
  onPreview,
}: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedMobileChildren, setSelectedMobileChildren] = useState<ReactNode>(null);
  const [hideActiveChildren, setHideActiveChildren] = useState(false);
  const [overlayPreview, setOverlayPreviewCb] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const onCollapse = (state: boolean) => {
    if (collapsed !== state) setTransitioning(true);
    onCollapseProp?.(state);
  };

  const setOverlayPreview = (state: boolean) => {
    if (overlayPreview !== state) setTransitioning(true);
    setOverlayPreviewCb(state);
    onPreview?.(state);
  };

  const sideNavigationContext = {
    selectedItemId,
    setSelectedItemId,
    selectedMobileChildren,
    setSelectedMobileChildren,
    hideActiveChildren,
    setHideActiveChildren,
    overlayPreview,
    setOverlayPreview,
    dismissButton,
    collapsible,
    collapsed,
    onCollapse,
    transitioning,
    setTransitioning,
  } as const;

  return <Provider value={sideNavigationContext}>{children}</Provider>;
}

function useSideNavigation(): SideNavigationContextType {
  return useContext(SideNavigationContext);
}

export { SideNavigationConsumer, SideNavigationProvider, useSideNavigation };
