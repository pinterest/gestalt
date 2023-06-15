// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <Box direction="column" width="100%">
      <Box
        paddingY={4}
        paddingX={8}
        dangerouslySetInlineStyle={{
          __style: { borderBottom: '1px solid var(--color-border-container)' },
        }}
      >
        {/* This is replacing an actual PageHeader so we don't run into accessibility error in the page */}
        <Heading accessibilityLevel="none" size="500">
          Tag manager
        </Heading>
      </Box>
      <Flex>
        <SideNavigation accessibilityLabel="Correct headings example" showBorder>
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
        <Box padding={4}>
          <Heading accessibilityLevel={2} size="400">
            Tag manager
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
