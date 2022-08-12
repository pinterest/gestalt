// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  const { icons } = Icon;

  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box height={375} width={575} color="default">
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          wrap
        >
          {icons.map((name, index) => (
            <Box key={index} padding={2}>
              <Icon color="default" accessibilityLabel="" icon={name} />
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
