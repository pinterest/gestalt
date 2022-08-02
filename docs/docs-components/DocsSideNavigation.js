// @flow strict
import { type Node, useState, useEffect } from 'react';
import { SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex, { type siteIndexType } from './siteIndex.js';

import { useNavigationContext } from './navigationContext.js';
import useGetSideNavItems from './useGetSideNavItems.js';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher.js';

export const MIN_NAV_WIDTH_PX = 280;

export function convertNamesForURL(name: string): string {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

export function isComponentsActiveSection(pathname: string): boolean {
  return pathname.includes('/web/') || pathname.includes('/ios/') || pathname.includes('/android/');
}

export default function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const [activeSection, setActiveSection] = useState(newSidebarIndex[0]);

  const router = useRouter();
  const { componentPlatformFilteredBy, setComponentPlatformFilteredByCookie, setIsSidebarOpen } =
    useNavigationContext();

  useEffect(() => {
    const sectionToRender = isComponentsActiveSection(router.pathname)
      ? newSidebarIndex.find((section) =>
          convertNamesForURL(section.sectionName).includes(componentPlatformFilteredBy),
        )
      : newSidebarIndex.find((section) =>
          router.pathname.includes(convertNamesForURL(section.sectionName)),
        );
    setActiveSection(sectionToRender || newSidebarIndex[0]);
  }, [router.pathname, componentPlatformFilteredBy]);
  // Find the section that corresponds to the top navigation

  const sectionItemsForSideNav = useGetSideNavItems((activeSection: siteIndexType));
  const closeSideNavigation = () => setIsSidebarOpen(false);

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      header={
        isComponentsActiveSection(router.pathname) && (
          <SidebarPlatformSwitcher
            componentPlatformFilteredBy={componentPlatformFilteredBy}
            onClick={(platform) => setComponentPlatformFilteredByCookie(platform)}
          />
        )
      }
      title="Menu"
      dismissButton={{
        onDismiss: closeSideNavigation,
        tooltip: {
          text: 'Close navigation',
        },
      }}
    >
      {sectionItemsForSideNav}
    </SideNavigation>
  );
}
