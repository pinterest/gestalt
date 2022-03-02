// @flow strict
import { Fragment, type Node } from 'react';
import { Box, Divider } from 'gestalt';
import HeaderMenu from './HeaderMenu.js';
import SidebarSection from './SidebarSection.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import sidebarIndex from './sidebarIndex.js';
import { useNavigationContext } from './navigationContext.js';
import SidebarCategorizationButton from './buttons/SidebarCategorizationButton.js';

export const MIN_NAV_WIDTH_PX = 255;

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
  const { sidebarOrganisedBy, isSidebarOpen, setSidebarOrganizedBy } = useNavigationContext();

  return (
    <Box aria-label="main" role="navigation">
      {isSidebarOpen && (
        <Fragment>
          <HeaderMenu />

          <Box
            height={350}
            overflow="scroll"
            display="block"
            mdDisplay="none"
            paddingY={2}
            paddingX={4}
          >
            <Divider />
            <Box paddingX={2} paddingY={3}>
              <SidebarCategorizationButton
                onClick={() =>
                  setSidebarOrganizedBy(
                    sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
                  )
                }
                sidebarOrganisedBy={sidebarOrganisedBy}
              />
            </Box>
            <Divider />
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
          minWidth={MIN_NAV_WIDTH_PX}
        >
          <Box marginBottom={4} paddingX={2}>
            <SidebarCategorizationButton
              onClick={() =>
                setSidebarOrganizedBy(
                  sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
                )
              }
              sidebarOrganisedBy={sidebarOrganisedBy}
            />
          </Box>
          <Divider />
          <NavList sidebarOrganisedBy={sidebarOrganisedBy} />
        </Box>
      </Box>
    </Box>
  );
}
