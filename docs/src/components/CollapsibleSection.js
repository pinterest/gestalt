// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, Icon, Row, TapArea, Text } from 'gestalt';
import { useLocation } from 'react-router-dom';
import CollapsibleSubsection from './CollapsibleSubsection.js';
import { type sidebarIndexType } from './sidebarIndex.js';
import NavLink from './NavLink.js';

export default function CollapsibleSection({ section }: sidebarIndexType) {
  const { pathname } = useLocation();
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(
    section.sectionPathname === pathname.split('/')[1]
  );

  // Check if section and pathname from react-router-dom equality same everytime URL changes.
  // If both match, keep section in sidebar open.
  useEffect(() => {
    setIsSectionCollapsed(section.sectionPathname === pathname.split('/')[1]);
  }, [section, pathname]);

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
          setIsSectionCollapsed(!isSectionCollapsed);
        }}
      >
        <Box padding={2} role="list">
          <Row justifyContent="between">
            <Text size="lg" weight="bold">
              {section.sectionName}
            </Text>
            <Icon
              icon={isSectionCollapsed ? 'arrow-down' : 'arrow-forward'}
              size={10}
            />
          </Row>
        </Box>
      </TapArea>
      {isSectionCollapsed && showSection()}
    </>
  );
}
