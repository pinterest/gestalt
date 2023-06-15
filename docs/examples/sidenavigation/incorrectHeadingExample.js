// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex>
      <SideNavigation accessibilityLabel="Incorrect headings example" showBorder>
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Tag manager"
          icon="margins-small"
        />
        <SideNavigation.TopItem
          href="#"
          icon="refresh"
          onClick={({ event }) => event.preventDefault()}
          label="Upload file"
        />
        <SideNavigation.TopItem
          href="#"
          icon="visit"
          onClick={({ event }) => event.preventDefault()}
          label="Upload history"
        />
      </SideNavigation>
      <Box paddingX={4}>
        <Heading accessibilityLevel="none" size="500">
          Tag manager
        </Heading>
      </Box>
    </Flex>
  );
}
