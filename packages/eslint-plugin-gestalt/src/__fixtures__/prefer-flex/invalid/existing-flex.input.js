import { Box, Flex } from 'gestalt';

export default function TestElement() {
  return (
    <Flex>
      <Box marginBottom={3} rounding={2} />
      <Box display="flex" alignItems="center" />
    </Flex>
  );
}
