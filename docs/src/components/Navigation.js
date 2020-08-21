// @flow strict
import React from 'react';
import { Box } from 'gestalt';
import SidebarSection from './SidebarSection.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import sidebarIndex from './sidebarIndex.js';
import { useSidebarContext } from './sidebarContext.js';

function getAlphabetizedComponents() {
  return Array.from(
    new Set(
      sidebarIndex
        .map(section => section.pages)
        .flat()
        .sort()
    )
  );
}

export default function Navigation() {
  const { sidebarOrganisedBy, isSidebarOpen } = useSidebarContext();

  const navList = (
    <>
      {sidebarOrganisedBy === 'categorized' ? (
        sidebarIndex.map(section => (
          <SidebarSection section={section} key={section.sectionName} />
        ))
      ) : (
        <Box marginTop={4}>
          {getAlphabetizedComponents().map((componentName, i) => (
            <SidebarSectionLink key={i} componentName={componentName} />
          ))}
        </Box>
      )}
    </>
  );

  return (
    <>
      {isSidebarOpen && (
        <Box display="block" mdDisplay="none" padding={4}>
          {navList}
        </Box>
      )}

      <Box display="none" mdDisplay="block" padding={4}>
        {navList}
      </Box>
    </>
  );
}
