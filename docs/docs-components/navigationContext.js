// @flow strict
import { type Node, useState } from 'react';
import { useCookies } from 'react-cookie';
import createHydra, { type Hydra } from './createHydra.js';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by-platform';

export type ComponentPlatformFilteredBy = 'web' | 'ios' | 'android';

export type NavigationContextType = {|
  isSidebarOpen: boolean,
  setIsSidebarOpen: (val: boolean) => void,
  componentPlatformFilteredBy: ComponentPlatformFilteredBy,
  setComponentPlatformFilteredBy: (val: ComponentPlatformFilteredBy) => void,
  sideNavigationSelectedTab: string,
  setSideNavigationSelectedTab: (val: string) => void,
|};

const {
  Provider,
  Consumer: NavigationContextConsumer,
  useHook: useNavigationContext,
}: Hydra<NavigationContextType> = createHydra<NavigationContextType>('NavigationContext');

function NavigationContextProvider({ children }: {| children?: Node |}): Node {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sideNavigationSelectedTab, setSideNavigationSelectedTab] = useState('get-started');

  const [cookies, setCookies] = useCookies([localStorageOrganizedByKey]);
  const PLATFORM_MAP = {
    'web': 'web',
    'ios': 'ios',
    'android': 'android',
  };
  const componentPlatformFilteredBy: ComponentPlatformFilteredBy =
    PLATFORM_MAP[cookies[localStorageOrganizedByKey] || 'web'];
  const setComponentPlatformFilteredBy = (organizedBy) =>
    setCookies(localStorageOrganizedByKey, organizedBy);

  return (
    <Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        componentPlatformFilteredBy,
        setComponentPlatformFilteredBy,
        sideNavigationSelectedTab,
        setSideNavigationSelectedTab,
      }}
    >
      {children}
    </Provider>
  );
}

export { NavigationContextProvider, NavigationContextConsumer, useNavigationContext };
