import { ReactNode } from 'react';
import { Box, Flex, Text, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="300" weight="bold">
          First name
        </Text>
        <TextField
          id="textfieldexampleHiddenLabel"
          label="First name"
          labelDisplay="hidden"
          onChange={() => {}}
          size="lg"
        />
      </Flex>
    </Box>
  );
}
