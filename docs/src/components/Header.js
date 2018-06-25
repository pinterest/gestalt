// @flow
import React from 'react';
import { Box, Text, Icon, Link as GestaltLink } from 'gestalt';
import Link from './Link.js';

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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="/">
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
          <GestaltLink
            href="https://codesandbox.io/s/k5plvp9v8v"
            target="blank"
          >
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>

        <Text color="white" size="lg">
          <GestaltLink
            href="https://github.com/pinterest/gestalt"
            target="blank"
          >
            <Box padding={2}>GitHub</Box>
          </GestaltLink>
        </Text>
      </Box>
    </Box>
  );
}
