// @flow strict
import React, { Fragment, type Node } from 'react';
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

export default function Navigation(): Node {
  const { sidebarOrganisedBy, isSidebarOpen } = useNavigationContext();

  const navList = (
    <Fragment>
      {sidebarOrganisedBy === 'categorized' ? (
        sidebarIndex.map((section) => (
          <SidebarSection section={section} key={section.sectionName} />
        ))
      ) : (
        <Box marginTop={4}>
          {getAlphabetizedComponents().map((componentName, i) => (
            <SidebarSectionLink key={i} componentName={componentName} />
          ))}
        </Box>
      )}
    </Fragment>
  );

  return (
    <Box role="navigation">
      {isSidebarOpen && (
        <Fragment>
          <HeaderMenu />
          <Box height={350} overflow="scroll" display="block" mdDisplay="none" padding={4}>
            {navList}
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
          {navList}
        </Box>
      </Box>
    </Box>
  );
}
