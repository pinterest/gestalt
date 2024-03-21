// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text, TextField } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={{ column: 0, row: 6 }}>
        <TextField
          id="textfieldexampleA11yVisible"
          label="First name"
          onChange={() => {}}
          size="lg"
        />
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text size="300" weight="bold">
            First name
          </Text>
          <TextField
            id="textfieldexampleA11yHiddenLabel"
            label="First name"
            labelDisplay="hidden"
            onChange={() => {}}
            size="lg"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
