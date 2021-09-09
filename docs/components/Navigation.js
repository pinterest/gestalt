// @flow strict
import type { Node } from 'react';

import { Fragment } from 'react';
import { Box } from 'gestalt';
import HeaderMenu from './HeaderMenu.js';
import SidebarSection from './SidebarSection.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import sidebarIndex from './sidebarIndex.js';
import { useNavigationContext } from './navigationContext.js';

function getAlphabetizedComponents() {
  return Array.from(
    new Set(
      sidebarIndex
        .map((section) => section.pages)
        .flat()
        .sort(),
    ),
  );
}

function NavList({ sidebarOrganisedBy }: {| sidebarOrganisedBy: string |}) {
  return (
    <Fragment key={sidebarOrganisedBy}>
      {sidebarOrganisedBy === 'categorized' ? (
        sidebarIndex.map((section) => (
          <SidebarSection section={section} key={`${sidebarOrganisedBy}-${section.sectionName}`} />
        ))
      ) : (
        <Box marginTop={4}>
          {getAlphabetizedComponents().map((componentName, i) => (
            <SidebarSectionLink componentName={componentName} key={`${sidebarOrganisedBy}-${i}`} />
          ))}
        </Box>
      )}
    </Fragment>
  );
}

export default function Navigation(): Node {
  const { sidebarOrganisedBy, isSidebarOpen } = useNavigationContext();

  return (
    <Box role="navigation">
      {isSidebarOpen && (
        <Fragment>
          <HeaderMenu />
          <Box height={350} overflow="scroll" display="block" mdDisplay="none" padding={4}>
            <NavList sidebarOrganisedBy={sidebarOrganisedBy} />
          </Box>
        </Fragment>
      )}

      <Box display="none" mdDisplay="block" color="white">
        <Box
          padding={4}
          position="fixed"
          overflow="auto"
          maxHeight="calc(100% - 60px)"
          minWidth={240}
        >
          <NavList sidebarOrganisedBy={sidebarOrganisedBy} />
        </Box>
      </Box>
    </Box>
  );
}
