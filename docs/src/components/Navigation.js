// @flow strict
import React, { type Node } from 'react';
import { Box, Icon } from 'gestalt';
import SidebarSection from './SidebarSection.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import sidebarIndex from './sidebarIndex.js';
import { useSidebarContext } from './sidebarContext.js';
import { usePinnedSectionContext } from './pinnedSectionContext.js';

function getAlphabetizedComponents() {
  return Array.from(
    new Set(
      sidebarIndex
        .map((section) => section.pages)
        .flat()
        .sort()
    )
  );
}

export default function Navigation(): Node {
  const { sidebarOrganisedBy, isSidebarOpen } = useSidebarContext();
  const { pinnedSection } = usePinnedSectionContext();
  const pinnedSectionArr = JSON.parse(pinnedSection);

  const navList = (
    <>
      {sidebarOrganisedBy === 'categorized' ? (
        sidebarIndex.map((section) => (
          <SidebarSection section={section} key={section.sectionName} />
        ))
      ) : (
        <Box marginTop={4}>
          {getAlphabetizedComponents()
            .filter(
              (componentName) => !pinnedSectionArr.includes(componentName)
            )
            .map((componentName, i) => (
              <SidebarSectionLink key={i} componentName={componentName} />
            ))}
        </Box>
      )}
    </>
  );

  return (
    <Box role="navigation">
      {isSidebarOpen && (
        <Box display="block" mdDisplay="none" padding={4}>
          {navList}
        </Box>
      )}

      <Box display="none" mdDisplay="block" color="white">
        <Box
          padding={4}
          position="fixed"
          overflow="auto"
          maxHeight="calc(100% - 60px)"
          minWidth={240}
        >
          {pinnedSectionArr.length !== 0 && (
            <>
              <Box padding={2}>
                <Icon accessibilityLabel="Pinned Sections" icon="angled-pin" />
              </Box>
              {pinnedSectionArr.map((componentName, i) => (
                <SidebarSectionLink
                  componentName={componentName}
                  key={`pinned-${i}`}
                />
              ))}
            </>
          )}
          {navList}
        </Box>
      </Box>
    </Box>
  );
}
