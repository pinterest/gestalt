// @flow strict
import type { Node } from 'react';
import { Box, Flex, Text } from 'gestalt';
import { type sidebarIndexType } from './sidebarIndex.js';
import SidebarSectionLink from './SidebarSectionLink.js';

export default function SidebarSection({ section }: {| section: sidebarIndexType |}): Node {
  return (
    <Box role="list">
      <Box role="listitem" padding={2} marginTop={4}>
        <Flex justifyContent="between">
          <Text size="sm">{section.sectionName}</Text>
        </Flex>
      </Box>

      {section.pages.map((componentName, i) => (
        <SidebarSectionLink key={i} componentName={componentName} />
      ))}
    </Box>
  );
}
