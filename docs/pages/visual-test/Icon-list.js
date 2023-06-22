// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Icon } from 'gestalt';

export default function Snapshot(): Node {
  const { icons } = Icon;

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box height={375} width={575} color="default">
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          wrap
        >
          {icons.map((name) => (
            <Box key={name} padding={2}>
              <Icon color="default" accessibilityLabel="" icon={name} />
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
