// @flow strict
import React, { type Node } from 'react';
import { Box, Row, Text } from 'gestalt';
import { type sidebarIndexType } from './sidebarIndex.js';
import SidebarSectionLink from './SidebarSectionLink.js';

export default function SidebarSection({
  section,
}: {|
  section: sidebarIndexType,
|}): Node {
  return (
    <Box role="list">
      <Box padding={2} marginTop={4}>
        <Row justifyContent="between">
          <Text size="sm">{section.sectionName}</Text>
        </Row>
      </Box>

      {section.pages.map((componentName, i) => (
        <SidebarSectionLink key={i} componentName={componentName} />
      ))}
    </Box>
  );
}
