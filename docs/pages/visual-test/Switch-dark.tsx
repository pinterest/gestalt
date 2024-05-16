import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Label, Switch, Text } from 'gestalt';

export default function Screenshot() {
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
              <Label htmlFor="2">
                <Text>Not switched</Text>
              </Label>
              <Switch id="2" onChange={() => {}} />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Label htmlFor="4">
                <Text>Not switched, disabled</Text>
              </Label>
              <Switch disabled id="4" onChange={() => {}} />
            </Flex>
          </Flex>
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
              <Label htmlFor="1">
                <Text>Switched</Text>
              </Label>
              <Switch id="1" onChange={() => {}} switched />
            </Flex>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <Label htmlFor="3">
                <Text>Switched, disabled</Text>
              </Label>
              <Switch disabled id="3" onChange={() => {}} switched />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
