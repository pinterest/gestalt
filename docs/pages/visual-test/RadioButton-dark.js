// @flow strict
import { type Node } from 'react';
import { Flex, RadioButton, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <RadioButton
            checked
            id="monday"
            label="Monday"
            subtext="Morning and afternoon"
            name="Availability"
            onChange={() => {}}
            value="monday"
          />
          <RadioButton
            id="tuesday"
            label="Tuesday"
            subtext="Morning, afternoon, and evening"
            name="Availability"
            onChange={() => {}}
            value="tuesday"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
