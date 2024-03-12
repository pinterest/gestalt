// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

export interface Indexable {
  index(): number;
}

type Timeout = ReturnType<typeof setTimeout>;

type SideNavigationContextType = {
  selectedItemId: string,
  setSelectedItemId: (string) => void,
  selectedMobileChildren: ReactNode | null,
  setSelectedMobileChildren: (ReactNode | null) => void,
  hideActiveChildren: boolean,
  setHideActiveChildren: (boolean) => void,
  overlayPreview: boolean,
  setOverlayPreview: (boolean) => void,
  collapsed?: boolean,
  onCollapse?: (boolean) => void,
  transitioning?: boolean,
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

const COLLAPSE_TRANSITION_DURATION = 200; // .2s

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
  });

const { Provider, Consumer: SideNavigationConsumer } = SideNavigationContext;

function SideNavigationProvider({
  children,
  dismissButton,
  collapsed,
  onCollapse: onCollapseProp,
}: Props): Element<typeof Provider> {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedMobileChildren, setSelectedMobileChildren] = useState<ReactNode>(null);
  const [hideActiveChildren, setHideActiveChildren] = useState(false);
  const [overlayPreview, setOverlayPreviewCb] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const transitionTimeoutRef = useRef<?Timeout>();

  const handleTransition = () => {
    setTransitioning(true);
    clearTimeout(transitionTimeoutRef.current);

    transitionTimeoutRef.current = setTimeout(
      () => setTransitioning(false),
      COLLAPSE_TRANSITION_DURATION,
    );
  };

  const onCollapse = (state: boolean) => {
    if (collapsed !== state) handleTransition();
    onCollapseProp?.(state);
  };

  const setOverlayPreview = (state: boolean) => {
    if (overlayPreview !== state) handleTransition();
    setOverlayPreviewCb(state);
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
    collapsed,
    onCollapse,
    transitioning,
  };

  return <Provider value={sideNavigationContext}>{children}</Provider>;
}

function useSideNavigation(): SideNavigationContextType {
  return useContext(SideNavigationContext);
}

export { SideNavigationConsumer, SideNavigationProvider, useSideNavigation };
