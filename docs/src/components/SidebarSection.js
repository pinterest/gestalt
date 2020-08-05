// @flow strict
import React from 'react';
import { Box, Row, Text } from 'gestalt';
import { type sidebarIndexType } from './sidebarIndex.js';
import NavLink from './NavLink.js';

export default function SidebarSection({ section }: sidebarIndexType) {
  return (
    <>
      <Box padding={2} marginTop={4} role="list">
        <Row justifyContent="between">
          <Text size="sm">{section.sectionName}</Text>
        </Row>
      </Box>
      {section.pages.map((component, i) => (
        <Box key={i}>
          <NavLink to={`/${component}`}>
            <Box padding={2} role="listitem">
              {component}
            </Box>
          </NavLink>
        </Box>
      ))}
    </>
  );
}
