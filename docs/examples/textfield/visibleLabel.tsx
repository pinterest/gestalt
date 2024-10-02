import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <TextField
          id="textfieldexamplevisibleLabel"
          label="First name"
          labelDisplay="visible"
          onChange={() => {}}
          size="sm"
        />
        <TextField
          id="textfieldexamplevisibleLabel"
          label="First name"
          labelDisplay="visible"
          onChange={() => {}}
          size="md"
        />
        <TextField
          id="textfieldexamplevisibleLabel"
          label="First name"
          labelDisplay="visible"
          onChange={() => {}}
          size="lg"
        />
      </Flex>
    </Box>
  );
}
