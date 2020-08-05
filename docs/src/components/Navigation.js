// @flow strict
import React from 'react';
import { Box } from 'gestalt';
import SidebarSection from './SidebarSection.js';
import sidebarIndex from './sidebarIndex.js';
import { useSidebarContext } from './sidebarContext.js';

export default function Navigation() {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      {isSidebarOpen && (
        <Box display="block" mdDisplay="none" padding={4}>
          {sidebarIndex.map(section => (
            <SidebarSection section={section} key={section.sectionName} />
          ))}
        </Box>
      )}

      <Box display="none" mdDisplay="block" padding={4}>
        {sidebarIndex.map(section => (
          <SidebarSection section={section} key={section.sectionName} />
        ))}
      </Box>
    </>
  );
}
