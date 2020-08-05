// @flow strict
import React, { useState } from 'react';
import { Box, SelectList } from 'gestalt';
import SidebarSection from './SidebarSection.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import sidebarIndex from './sidebarIndex.js';
import { useSidebarContext } from './sidebarContext.js';

const componentSections = sidebarIndex.filter(
  indexItm => indexItm.sectionName !== 'Getting Started'
);

function getAlphabetizedComponents() {
  return Array.from(
    new Set(
      componentSections
        .map(section => section.pages)
        .flat()
        .sort()
    )
  );
}

function gettingStartedSection() {
  const gettingStarted = sidebarIndex.find(
    itm => itm.sectionName === 'Getting Started'
  );

  return (
    <SidebarSection section={gettingStarted} key={gettingStarted.sectionName} />
  );
}

export default function Navigation() {
  const { isSidebarOpen } = useSidebarContext();
  const [organizedBy, setOrganizedBy] = useState('categorized');

  const navList = (
    <>
      {gettingStartedSection()}

      <Box marginTop={4}>
        <SelectList
          id="organizedBy"
          name="organizedBy"
          onChange={({ value }) => setOrganizedBy(value)}
          options={[
            { label: 'Alpabetical', value: 'alphabetical' },
            { label: 'Categorized', value: 'categorized' },
          ]}
          placeholder="Select component organization"
          label="Component organization"
          value={organizedBy}
        />
      </Box>

      {organizedBy === 'categorized' ? (
        componentSections.map(section => (
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
