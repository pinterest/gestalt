// @flow strict
import { type Node } from 'react';
import { Box, SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex, { type sidebarIndexType } from './newSidebarIndex.js';

import { useNavigationContext } from './navigationContext.js';
import useGetSideNavItems from './useGetSideNavItems.js';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher.js';

export const MIN_NAV_WIDTH_PX = 280;

function convertNamesForURL(name) {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const router = useRouter();
  const { sidebarOrganisedBy, setSidebarOrganizedBy } = useNavigationContext();

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
          subSection.sectionName.toLowerCase().includes(sidebarOrganisedBy),
      ) || null;

    // Flatten the section date to cut out the middle layer
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
  const sectionItemsForSideNav = useGetSideNavItems((sectionToRender: sidebarIndexType));

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      header={
        router.pathname.includes('components') && (
          <SidebarPlatformSwitcher
            sidebarOrganisedBy={sidebarOrganisedBy}
            onClick={(platform) => setSidebarOrganizedBy(platform)}
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
      <DocsSideNavigation border />
    </Box>
  );
}
