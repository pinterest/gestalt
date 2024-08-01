import { Box, Flex, Label, Text, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="textfieldexampleHiddenLabel">
            <Text size="300" weight="bold">
              First name
            </Text>
          </Label>
          <TextField
            id="textfieldexampleHiddenLabel"
            labelDisplay="hidden"
            onChange={() => {}}
            size="sm"
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="textfieldexampleHiddenLabel">
            <Text size="300" weight="bold">
              First name
            </Text>
          </Label>
          <TextField
            id="textfieldexampleHiddenLabel"
            labelDisplay="hidden"
            onChange={() => {}}
            size="md"
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="textfieldexampleHiddenLabel">
            <Text size="300" weight="bold">
              First name
            </Text>
          </Label>
          <TextField
            id="textfieldexampleHiddenLabel"
            labelDisplay="hidden"
            onChange={() => {}}
            size="lg"
          />
        </Flex>{' '}
      </Flex>
    </Box>
  );
}
