// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import createHydra, { type Hydra } from './createHydra.js';
import useLocalStorage from './useLocalStorage.js';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by';

type SidebarOrganisedBy = 'categorized' | 'alphabetical';

export type NavigationContextType = {|
  isSidebarOpen: boolean,
  setIsSidebarOpen: (val: boolean) => void,
  sidebarOrganisedBy: SidebarOrganisedBy,
  setSidebarOrganizedBy: (val: SidebarOrganisedBy) => void,
|};

const {
  Provider,
  Consumer: NavigationContextConsumer,
  useHook: useNavigationContext,
}: Hydra<NavigationContextType> = createHydra<NavigationContextType>('NavigationContext');

function NavigationContextProvider({ children }: {| children?: Node |}): Node {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sidebarOrganisedBy, setSidebarOrganizedBy] = useLocalStorage<SidebarOrganisedBy>(
    localStorageOrganizedByKey,
    'categorized',
  );

  return (
    <Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        sidebarOrganisedBy,
        setSidebarOrganizedBy,
      }}
    >
      {children}
    </Provider>
  );
}

export { NavigationContextProvider, NavigationContextConsumer, useNavigationContext };
