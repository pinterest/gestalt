// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';
import { type sidebarIndexType } from './sidebarIndex.js';
import SidebarSectionLink from './SidebarSectionLink.js';
import { useNavigationSidebarContext } from './navigationSidebarContext.js';

export default function SidebarSection({
  section,
}: {|
  section: sidebarIndexType,
|}): Node {
  const { pinnedSection } = useNavigationSidebarContext();
  const pinnedSectionArr = JSON.parse(pinnedSection);

  return (
    <Box role="list">
      <Box role="listitem" padding={2} marginTop={4}>
        <Flex justifyContent="between">
          <Text size="sm">{section.sectionName}</Text>
        </Flex>
      </Box>
      {section.pages
        .filter((componentName) => !pinnedSectionArr.includes(componentName))
        .map((componentName, i) => (
          <SidebarSectionLink key={i} componentName={componentName} />
        ))}
    </Box>
  );
}
