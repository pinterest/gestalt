import { Box, Flex, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <TextField
          errorMessage={"This field can't be blank!"}
          id="error-example-sm"
          label="Email address"
          onChange={() => {}}
          placeholder="Email"
          size="sm"
          value=""
        />
        <TextField
          errorMessage={"This field can't be blank!"}
          id="error-example-md"
          label="Email address"
          onChange={() => {}}
          placeholder="Email"
          size="md"
          value=""
        />
        <TextField
          errorMessage={"This field can't be blank!"}
          id="error-example-lg"
          label="Email address"
          onChange={() => {}}
          placeholder="Email"
          size="lg"
          value=""
        />
      </Flex>
    </Box>
  );
}
