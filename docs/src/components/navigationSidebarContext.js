// @flow strict
import React, { useState, type Node } from 'react';
import createHydra, { type Hydra } from './createHydra.js';
import useLocalStorage from './useLocalStorage.js';

const pinnedSectionKey = 'gestalt-pinned-components';
const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by';

export type NavigationSidebarContextType = {|
  isSidebarOpen: boolean,
  setIsSidebarOpen: (val: boolean) => void,
  sidebarOrganisedBy: 'categorized' | 'alphabetical',
  setSidebarOrganizedBy: (val: 'categorized' | 'alphabetical') => void,
  pinnedSection: string,
  setPinnedSection: (val: string) => void,
|};

const hydra: Hydra<NavigationSidebarContextType> = createHydra<NavigationSidebarContextType>(
  'NavigationSidebar'
);

const {
  Provider: ContextProvider,
  Consumer: NavigationSidebarContextConsumer,
  useHook: useNavigationSidebarContext,
} = hydra;

function NavigationSidebarContextProvider({
  children,
}: {|
  children?: Node,
|}): Node {
  const [pinnedSection, setPinnedSection] = useLocalStorage<string>(
    pinnedSectionKey,
    '[]'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOrganisedBy, setSidebarOrganizedBy] = useLocalStorage<
    'categorized' | 'alphabetical'
  >(localStorageOrganizedByKey, 'categorized');

  return (
    <ContextProvider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        sidebarOrganisedBy,
        setSidebarOrganizedBy,
        pinnedSection,
        setPinnedSection,
      }}
    >
      {children}
    </ContextProvider>
  );
}

export {
  NavigationSidebarContextProvider,
  NavigationSidebarContextConsumer,
  useNavigationSidebarContext,
};
