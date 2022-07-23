// @flow strict
import { type Node } from 'react';
import { Box, SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import newSidebarIndex from './newSidebarIndex.js';

import { useNavigationContext } from './navigationContext.js';
import useGetSideNavItems from './useGetSideNavItems.js';
import SidebarPlatformSwitcher from './buttons/SidebarPlatformSwitcher.js';

export const MIN_NAV_WIDTH_PX = 280;

function convertNamesForURL(name) {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const router = useRouter();
  const sectionToRender =
    newSidebarIndex.find((section) =>
      router.pathname.includes(convertNamesForURL(section.sectionName)),
    ) || newSidebarIndex[0];
  const innerSideNavItems = useGetSideNavItems(sectionToRender);
  const { sidebarOrganisedBy, setSidebarOrganizedBy } = useNavigationContext();
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
      {innerSideNavItems}
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
