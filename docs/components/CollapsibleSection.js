// @flow strict
import React, { useState } from 'react';
import { Box, Icon, Row, TapArea, Text } from 'gestalt';
import CollapsibleSubsection from './CollapsibleSubsection.js';
import { type sidebarIndexType } from './sidebarIndex.js';
import NavLink from './NavLink.js';

export default function CollapsibleSection({ section }: sidebarIndexType) {
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const showSection = () =>
    section.pages
      ? section.pages.map((component, i) => (
          <Box marginStart={4} key={i}>
            <NavLink to={`/${section.sectionPathname}/${component}`}>
              <Box padding={2} role="listitem">
                {component}
              </Box>
            </NavLink>
          </Box>
        ))
      : section.subsections.map((subsection, i) => {
          return (
            <CollapsibleSubsection
              subsection={subsection}
              sectionPathname={section.sectionPathname}
              key={i}
            />
          );
        });

  return (
    <>
      <TapArea
        onTap={() => {
          setIsSectionOpen(!isSectionOpen);
        }}
      >
        <Box padding={2} role="list">
          <Row justifyContent="between">
            <Text size="lg" weight="bold">
              {section.sectionName}
            </Text>
            <Icon
              accessibilityLabel=""
              icon={isSectionOpen ? 'arrow-down' : 'arrow-forward'}
              size={10}
            />
          </Row>
        </Box>
      </TapArea>
      {isSectionOpen && showSection()}
    </>
  );
}
