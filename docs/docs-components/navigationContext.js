// @flow strict
import { type Node, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import createHydra, { type Hydra } from './createHydra.js';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by-platform';

export type ComponentPlatformFilteredBy = 'web' | 'ios' | 'android';

export type NavigationContextType = {|
  isSidebarOpen: boolean,
  setIsSidebarOpen: (boolean | ((boolean) => boolean)) => void,
  componentPlatformFilteredBy: ComponentPlatformFilteredBy,
  setComponentPlatformFilteredByCookie: (val: ComponentPlatformFilteredBy) => void,
  selectedTab: string,
  setSelectedTab: (string | ((string) => string)) => void,
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

  const { asPath: pathname } = useRouter();

  let currentPlatform = null;

  // If the route already includes a platform,
  // set that as the starting cookie
  if (pathname.includes('/web/')) {
    currentPlatform = 'web';
  } else if (pathname.includes('/android/')) {
    currentPlatform = 'android';
  } else if (pathname.includes('/ios/')) {
    currentPlatform = 'ios';
  }
  let currentSiteSection = null;

  if (currentPlatform) {
    currentSiteSection = 'Components';
  } else if (pathname.includes('/foundations/')) {
    currentSiteSection = 'Foundations';
  } else if (pathname.includes('/roadmap/')) {
    currentSiteSection = 'Roadmap';
  } else {
    currentSiteSection = 'Get started';
  }

  const [selectedTab, setSelectedTab] = useState(currentSiteSection);

  // First prioritize the current route
  // If that doesn't include a platform, use the cookie
  // If there's no cookie set, use 'web'
  const [componentPlatformFilteredBy, setComponentPlatformFilteredBy] = useState(
    PLATFORM_MAP[currentPlatform || cookies[localStorageOrganizedByKey] || 'web'],
  );

  // Set the cookie, and update the state
  const setComponentPlatformFilteredByCookie = (organizedBy: ComponentPlatformFilteredBy) => {
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
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </Provider>
  );
}

export { NavigationContextProvider, NavigationContextConsumer, useNavigationContext };
