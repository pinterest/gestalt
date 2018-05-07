// @flow
import React from 'react';
import { Box, Text, Link, Icon } from 'gestalt';

export default function Header() {
  return (
    <Box
      paddingY={2}
      paddingX={4}
      mdPaddingX={6}
      lgPaddingX={8}
      color="pine"
      display="flex"
      direction="row"
      alignItems="center"
    >
      <Box marginStart={-2} marginEnd={-2}>
        <Text size="lg" bold color="white">
          <Link href="/">
            <Box padding={2}>
              <Box
                display="flex"
                direction="row"
                alignItems="center"
                marginLeft={-1}
                marginRight={-1}
              >
                <Box paddingX={1}>
                  <Icon
                    icon="pinterest"
                    color="white"
                    size={24}
                    accessibilityLabel="Pinterest Logo"
                  />
                </Box>
                <Box paddingX={1}>Gestalt</Box>
              </Box>
            </Box>
          </Link>
        </Text>
      </Box>

      <Box flex="grow" />

      <Box marginStart={-2} marginEnd={-2} display="flex" direction="row">
        <Text color="white" size="lg">
          <Link href="https://codesandbox.io/s/k5plvp9v8v" target="_blank">
            <Box padding={2}>Playground</Box>
          </Link>
        </Text>

        <Text color="white" size="lg">
          <Link href="https://github.com/pinterest/gestalt" target="_blank">
            <Box padding={2}>GitHub</Box>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
