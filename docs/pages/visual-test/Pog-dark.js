// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Pog, Text } from 'gestalt';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Flex
            gap={{
              row: 4,
              column: 0,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Text>Default</Text>
              <Pog icon="heart" iconColor="red" />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Text>Hovered</Text>
              <Pog hovered icon="heart" iconColor="red" />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Text>Focused</Text>
              <Pog focused icon="heart" iconColor="red" />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Text>Active</Text>
              <Pog active icon="heart" iconColor="red" />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Text>Selected</Text>
              <Pog icon="heart" iconColor="red" selected />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
