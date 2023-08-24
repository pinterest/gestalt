// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text, TextField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 6 }}>
        <TextField
          id="textfieldexampleA11yVisible"
          onChange={() => {}}
          label="First name"
          size="lg"
        />
        <Flex gap={{ column: 2, row: 0 }} direction="column">
          <Text weight="bold" size="300">
            First name
          </Text>
          <TextField
            id="textfieldexampleA11yHiddenLabel"
            onChange={() => {}}
            label="First name"
            labelDisplay="hidden"
            size="lg"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
