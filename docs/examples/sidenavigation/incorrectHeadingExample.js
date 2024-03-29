// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex>
      <SideNavigation accessibilityLabel="Incorrect headings example" showBorder>
        <SideNavigation.TopItem
          href="#"
          icon="margins-small"
          label="Tag manager"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          icon="refresh"
          label="Upload file"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          icon="visit"
          label="Upload history"
          onClick={({ event }) => event.preventDefault()}
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
