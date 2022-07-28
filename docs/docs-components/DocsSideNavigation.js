// @flow strict
import { type Node } from 'react';
import { SideNavigation, Flex, SelectList } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex, { type siteIndexType } from './siteIndex.js';
import { useNavigationContext } from './navigationContext.js';
import useGetSideNavItems from './useGetSideNavItems.js';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher.js';
import { useDocsDeviceType } from './contexts/DocsDeviceTypeProvider.js';

export const MIN_NAV_WIDTH_PX = 280;

export function convertNamesForURL(name: string): string {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

export default function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const { pathname } = useRouter();
  const isComponents = pathname.includes('components');

  const { isMobile } = useDocsDeviceType();
  const {
    componentPlatformFilteredBy,
    setComponentPlatformFilteredBy,
    setIsSidebarOpen,
    sideNavigationSelectedTab,
    setSideNavigationSelectedTab,
  } = useNavigationContext();

  const switcher = isComponents ? (
    <SidebarPlatformSwitcher
      componentPlatformFilteredBy={componentPlatformFilteredBy}
      onClick={(platform) => setComponentPlatformFilteredBy(platform)}
    />
  ) : null;

  // Find the section that corresponds to the top navigation
  const activeSection =
    newSidebarIndex.find((section) =>
      isMobile
        ? section.sectionName === sideNavigationSelectedTab
        : pathname.includes(convertNamesForURL(section.sectionName)),
    ) || newSidebarIndex[0];

  let sectionToRender: siteIndexType = activeSection;

  // If that section is the components section, figure out which subsection
  // to render based on the active filter
  if (activeSection.sectionName === 'Components') {
    const subsectionToRender =
      activeSection.pages.find(
        (subSection) =>
          typeof subSection === 'object' &&
          subSection.sectionName.toLowerCase().includes(componentPlatformFilteredBy),
      ) || null;

    // Flatten the section data to cut out the middle layer
    if (
      subsectionToRender &&
      typeof subsectionToRender === 'object' &&
      subsectionToRender.pages &&
      subsectionToRender.sectionName
    ) {
      const newSectionName = `${activeSection.sectionName} - ${subsectionToRender.sectionName}`;
      sectionToRender = { sectionName: newSectionName, pages: subsectionToRender.pages };
    }
  }

  const closeSideNavigation = () => setIsSidebarOpen(false);

  const sectionItemsForSideNav = useGetSideNavItems({
    sectionInfo: sectionToRender,
  });

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      header={
        isMobile ? (
          <Flex direction="column" gap={4}>
            <SelectList
              labelDisplay="hidden"
              id="mobile-sidenav"
              onChange={({ value }) => {
                setSideNavigationSelectedTab(value);
              }}
              options={[
                { label: 'Get started', value: 'Get started' },
                { label: 'Components', value: 'Components' },
                { label: 'Foundations', value: 'Foundations' },
                { label: 'Roadmap', value: 'Roadmap' },
              ]}
              size="lg"
              label="Select site section"
              value={sideNavigationSelectedTab}
            />
            {switcher}
          </Flex>
        ) : (
          switcher
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
