// @flow strict
import React from 'react';
import { Box } from 'gestalt';
import CollapsibleSection from './CollapsibleSection.js';
import sidebarIndex from './sidebarIndex.js';
import { useSidebarContext } from './sidebarContext.js';

export default function Navigation() {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      {isSidebarOpen && (
        <Box display="block" mdDisplay="none" padding={4}>
          {sidebarIndex.map(section => (
            <CollapsibleSection
              section={section}
              key={section.sectionPathname}
            />
          ))}
        </Box>
      )}

      <Box display="none" mdDisplay="block" padding={4}>
        {sidebarIndex.map(section => (
          <CollapsibleSection section={section} key={section.sectionPathname} />
        ))}
      </Box>
    </>
  );
}
