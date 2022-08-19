// @flow strict
import { type Node, useState, useEffect } from 'react';
import { SideNavigation, Flex, SelectList } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex from './siteIndex.js';
import { useDocsDeviceType } from './contexts/DocsDeviceTypeProvider.js';
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

export default function DocsSideNavigation(): Node {
  const [activeSection, setActiveSection] = useState(newSidebarIndex[0]);

  const { isMobile } = useDocsDeviceType();
  const { pathname, query } = useRouter();
  const {
    componentPlatformFilteredBy,
    setComponentPlatformFilteredByCookie,
    setIsSidebarOpen,
    selectedTab,
    setSelectedTab,
  } = useNavigationContext();

  // Find the section that corresponds to the top navigation
  // If it's the components section, find the section that is currently
  // filtered with the component platform switcher

  // if it's a markdown path, then the url is provided in the query obj
  // in nextjs, if it's a dynamic route, the dynamic route id will be passed as part of the query obj
  const { id: pathId } = query;
  const dynamicUrlPath = pathId ? `/${pathId.join('/')}` : '';

  const isComponentsSection = isMobile
    ? selectedTab === 'Components'
    : isComponentsActiveSection(dynamicUrlPath || pathname);

  const platformSwitcher = isComponentsSection ? (
    <SidebarPlatformSwitcher
      componentPlatformFilteredBy={componentPlatformFilteredBy}
      onClick={(platform) => setComponentPlatformFilteredByCookie(platform)}
    />
  ) : null;

  const header = isMobile ? (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 4,
      }}
    >
      <SelectList
        labelDisplay="hidden"
        id="mobile-sidenavigation"
        onChange={({ value }) => setSelectedTab(value)}
        options={[
          { label: 'Get started', value: 'Get started' },
          { label: 'Components', value: 'Components' },
          { label: 'Foundations', value: 'Foundations' },
          { label: 'Roadmap', value: 'Roadmap' },
        ]}
        size="lg"
        label="Select site section"
        value={selectedTab}
      />
      {platformSwitcher}
    </Flex>
  ) : (
    platformSwitcher
  );

  useEffect(() => {
    const isComponentsCallback = (section) =>
      convertNamesForURL(section.sectionName).includes(componentPlatformFilteredBy);

    const isNotComponentsCallback = (section) =>
      isMobile
        ? section.sectionName === selectedTab
        : pathname.includes(convertNamesForURL(section.sectionName));

    const sectionToRender =
      newSidebarIndex.find(isComponentsSection ? isComponentsCallback : isNotComponentsCallback) ??
      newSidebarIndex[0];

    setActiveSection(sectionToRender);
  }, [isMobile, isComponentsSection, pathname, componentPlatformFilteredBy, selectedTab]);

  const sectionItemsForSideNav = useGetSideNavItems({ sectionInfo: activeSection });

  const closeSideNavigation = () => setIsSidebarOpen(false);

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      header={header}
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
