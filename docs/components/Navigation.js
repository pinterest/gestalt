// @flow strict
import { type Node } from 'react';
import { Box, SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex, { type siteIndexType } from './siteIndex.js';

import { useNavigationContext } from './navigationContext.js';
import useGetSideNavItems from './useGetSideNavItems.js';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher.js';

export const MIN_NAV_WIDTH_PX = 280;

export function convertNamesForURL(name: string): string {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const router = useRouter();
  const { componentPlatformFilteredBy, setComponentPlatformFilteredBy } = useNavigationContext();

  // Find the section that corresponds to the top navigation
  const activeSection =
    newSidebarIndex.find((section) =>
      router.pathname.includes(convertNamesForURL(section.sectionName)),
    ) || newSidebarIndex[0];
  let sectionToRender = activeSection;

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
  const sectionItemsForSideNav = useGetSideNavItems((sectionToRender: siteIndexType));

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      header={
        router.pathname.includes('components') && (
          <SidebarPlatformSwitcher
            componentPlatformFilteredBy={componentPlatformFilteredBy}
            onClick={(platform) => setComponentPlatformFilteredBy(platform)}
          />
        )
      }
    >
      {sectionItemsForSideNav}
    </SideNavigation>
  );
}

export default function Navigation(): Node {
  const { isSidebarOpen } = useNavigationContext();

  return isSidebarOpen ? (
    <Box height={350} overflow="scroll" display="block" mdDisplay="none" paddingY={2} paddingX={4}>
      <DocsSideNavigation />
    </Box>
  ) : (
    <Box
      display="none"
      mdDisplay="block"
      position="fixed"
      overflow="auto"
      minHeight="100%"
      maxHeight="calc(100% - 100px)"
      minWidth={MIN_NAV_WIDTH_PX}
      marginTop={2}
    >
      <DocsSideNavigation />
    </Box>
  );
}
