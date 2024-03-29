// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Icon } from 'gestalt';

export default function Snapshot(): ReactNode {
  const { icons } = Icon;

  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" height={600} width={575}>
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          wrap
        >
          {icons.map((name) => (
            <Box key={name} padding={2}>
              <Icon accessibilityLabel="" color="default" icon={name} />
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
