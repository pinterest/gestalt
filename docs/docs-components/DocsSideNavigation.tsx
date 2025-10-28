import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, SelectList, SideNavigation } from 'gestalt';
import { useDocsConfig } from './contexts/DocsConfigProvider';
import { useNavigationContext } from './navigationContext';
import newSidebarIndex, { siteIndexType } from './siteIndex';
import useGetSideNavItems from './useGetSideNavItems';

export const MIN_NAV_WIDTH_PX = 280;

export function convertNamesForURL(name: string): string {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

export function isComponentsActiveSection(pathname: string): boolean {
  return pathname.includes('/web/');
}

export default function DocsSideNavigation({ showBorder }: { showBorder?: boolean }) {
  const [activeSection, setActiveSection] = useState<siteIndexType>(newSidebarIndex[0]);

  const { isMobile } = useDocsConfig();
  const { pathname, query } = useRouter();
  const { componentPlatformFilteredBy, setIsSidebarOpen, selectedTab, setSelectedTab } =
    useNavigationContext();

  // Find the section that corresponds to the top navigation
  // If it's the components section, find the section that is currently
  // filtered with the component platform switcher

  const { id: pathId } = query;
  /**
   *  If it's a dynamic route (e.g. markdown page), the dynamic route id will be passed as part of the query obj, don't use pathname prop since it'll just say [...id]
   */
  // @ts-expect-error - TS2339 - Property 'join' does not exist on type 'string | string[]'.
  const dynamicUrlPath = pathId ? `/${pathId.join('/')}` : '';

  const isComponentsSection = isMobile
    ? selectedTab === 'Components'
    : isComponentsActiveSection(dynamicUrlPath || pathname);

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
    </Flex>
  ) : null;

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
