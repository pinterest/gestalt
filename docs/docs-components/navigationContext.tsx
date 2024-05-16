import { ReactNode, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import createHydra, { Hydra } from './createHydra';

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by-platform';

export type ComponentPlatformFilteredBy = 'web' | 'ios' | 'android';

export type NavigationContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (arg1: boolean | ((arg1: boolean) => boolean)) => void;
  componentPlatformFilteredBy: ComponentPlatformFilteredBy;
  setComponentPlatformFilteredByCookie: (val: ComponentPlatformFilteredBy) => void;
  selectedTab: string;
  setSelectedTab: (arg1: string | ((arg1: string) => string)) => void;
};

const PLATFORM_MAP = {
  web: 'web',
  ios: 'ios',
  android: 'android',
} as const;

const {
  Provider,
  Consumer: NavigationContextConsumer,
  useHook: useNavigationContext,
}: Hydra<NavigationContextType> = createHydra<NavigationContextType>('NavigationContext');

function NavigationContextProvider({ children }: { children?: ReactNode }) {
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
    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ readonly web: "web"; readonly ios: "ios"; readonly android: "android"; }'.
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

export { NavigationContextConsumer, NavigationContextProvider, useNavigationContext };
