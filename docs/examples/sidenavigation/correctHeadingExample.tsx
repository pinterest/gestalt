import React from 'react';
import { Box, Flex, Heading, SideNavigation } from 'gestalt';
import { TOKEN_COLOR_BORDER_CONTAINER } from 'gestalt-design-tokens';

export default function Example() {
  return (
    <Box direction="column" width="100%">
      <Box
        dangerouslySetInlineStyle={{
          __style: { borderBottom: `1px solid ${TOKEN_COLOR_BORDER_CONTAINER}` },
        }}
        paddingX={8}
        paddingY={4}
      >
        {/* This is replacing an actual PageHeader so we don't run into accessibility error in the page */}
        <Heading accessibilityLevel="none" size="600">
          Tag manager
        </Heading>
      </Box>
      <Flex>
        <SideNavigation accessibilityLabel="Correct headings example" showBorder>
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
        <Box padding={4}>
          <Heading accessibilityLevel={2} size="400">
            Tag manager
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
