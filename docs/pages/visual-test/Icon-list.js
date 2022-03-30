// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  const { icons } = Icon;

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box height={375} width={575} color="white">
        <Flex gap={1} wrap>
          {icons.map((name, index) => (
            <Box key={index} padding={2}>
              <Icon color="darkGray" accessibilityLabel="" icon={name} />
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
