// @flow strict
import { type Node } from 'react';
import { Box, HelpButton, ScrollBoundaryContainer } from 'gestalt';

export default function Example(): Node {
  return (
    <Box height={300} overflow="auto">
      <ScrollBoundaryContainer overflow="scrollY">
        <Box height={500} width={500} color="infoWeak" padding={6}>
          <HelpButton
            accessibilityLabel="Click to learn more about Gestalt"
            accessibilityPopoverLabel="Expanded information about Gestalt"
            isWithinScrollContainer
            link={{
              href: '#',
              text: 'Read our documentation',
              accessibilityLabel: 'Visit Gestalt portal',
            }}
            text="Gestalt is Pinterest's design system."
          />
        </Box>
      </ScrollBoundaryContainer>
    </Box>
  );
}
