// @flow strict
import { type Node, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import createHydra, { type Hydra } from './createHydra.js';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by-platform';

export type ComponentPlatformFilteredBy = 'web' | 'ios' | 'android';

export type NavigationContextType = {|
  isSidebarOpen: boolean,
  setIsSidebarOpen: (val: boolean) => void,
  componentPlatformFilteredBy: ComponentPlatformFilteredBy,
  setComponentPlatformFilteredByCookie: (val: ComponentPlatformFilteredBy) => void,
|};

const PLATFORM_MAP = {
  'web': 'web',
  'ios': 'ios',
  'android': 'android',
};

const {
  Provider,
  Consumer: NavigationContextConsumer,
  useHook: useNavigationContext,
}: Hydra<NavigationContextType> = createHydra<NavigationContextType>('NavigationContext');

function NavigationContextProvider({ children }: {| children?: Node |}): Node {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cookies, setCookies] = useCookies([localStorageOrganizedByKey]);

  const router = useRouter();
  let currentPlatform = null;

  if (router.pathname.includes('/web/')) {
    currentPlatform = 'web';
  } else if (router.pathname.includes('/android/')) {
    currentPlatform = 'android';
  } else if (router.pathname.includes('/ios/')) {
    currentPlatform = 'ios';
  }

  const [componentPlatformFilteredBy, setComponentPlatformFilteredBy] = useState(
    PLATFORM_MAP[currentPlatform || cookies[localStorageOrganizedByKey] || 'web'],
  );

  const setComponentPlatformFilteredByCookie = (organizedBy) => {
    setCookies(localStorageOrganizedByKey, organizedBy);
    setComponentPlatformFilteredBy(organizedBy);
  };

  return (
    <Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        componentPlatformFilteredBy,
        setComponentPlatformFilteredByCookie,
      }}
    >
      {children}
    </Provider>
  );
}

export { NavigationContextProvider, NavigationContextConsumer, useNavigationContext };
