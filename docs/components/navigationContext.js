// @flow strict
import type { Node } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import createHydra, { type Hydra } from './createHydra.js';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by';

export type SidebarOrganisedBy = 'categorized' | 'alphabetical';

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

  const [cookies, setCookies] = useCookies([localStorageOrganizedByKey]);

  const sidebarOrganisedBy: SidebarOrganisedBy =
    cookies[localStorageOrganizedByKey] === 'alphabetical' ? 'alphabetical' : 'categorized';
  const setSidebarOrganizedBy = (organizedBy) =>
    setCookies(localStorageOrganizedByKey, organizedBy);

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
