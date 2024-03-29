// @flow strict
import { type Node as ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, SelectList, SideNavigation } from 'gestalt';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher';
import { useDocsConfig } from './contexts/DocsConfigProvider';
import { useNavigationContext } from './navigationContext';
import newSidebarIndex, { type siteIndexType } from './siteIndex';
import useGetSideNavItems from './useGetSideNavItems';

export const MIN_NAV_WIDTH_PX = 280;

export function convertNamesForURL(name: string): string {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

export function isComponentsActiveSection(pathname: string): boolean {
  return pathname.includes('/web/') || pathname.includes('/ios/') || pathname.includes('/android/');
}

export default function DocsSideNavigation({ showBorder }: { showBorder?: boolean }): ReactNode {
  const [activeSection, setActiveSection] = useState(newSidebarIndex[0]);

  const { isMobile } = useDocsConfig();
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

  const { id: pathId } = query;
  /**
   *  If it's a dynamic route (e.g. markdown page), the dynamic route id will be passed as part of the query obj, don't use pathname prop since it'll just say [...id]
   */
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
        id="mobile-sidenavigation"
        label="Select site section"
        labelDisplay="hidden"
        onChange={({ value }) => setSelectedTab(value)}
        size="lg"
        value={selectedTab}
      >
        {[
          { label: 'Get started', value: 'Get started' },
          { label: 'Components', value: 'Components' },
          { label: 'Foundations', value: 'Foundations' },
          { label: 'Team support', value: 'Team support' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
      {platformSwitcher}
    </Flex>
  ) : (
    platformSwitcher
  );

  useEffect(() => {
    const isComponentsCallback = (section: siteIndexType) =>
      convertNamesForURL(section.sectionName).includes(componentPlatformFilteredBy);

    const isNotComponentsCallback = (section: siteIndexType) =>
      isMobile
        ? section.sectionName === selectedTab
        : (dynamicUrlPath || pathname).includes(convertNamesForURL(section.sectionName));

    const sectionToRender =
      newSidebarIndex.find(isComponentsSection ? isComponentsCallback : isNotComponentsCallback) ??
      newSidebarIndex[0];

    setActiveSection(sectionToRender);
  }, [
    isMobile,
    isComponentsSection,
    dynamicUrlPath,
    pathname,
    componentPlatformFilteredBy,
    selectedTab,
  ]);

  const sectionItemsForSideNav = useGetSideNavItems({
    sectionInfo: activeSection,
  });

  const closeSideNavigation = () => setIsSidebarOpen(false);

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      dismissButton={{
        onDismiss: closeSideNavigation,
        accessibilityLabel: 'Dismiss side navigation',
      }}
      header={header}
      mobileTitle="Menu"
      showBorder={showBorder}
    >
      {sectionItemsForSideNav}
    </SideNavigation>
  );
}
