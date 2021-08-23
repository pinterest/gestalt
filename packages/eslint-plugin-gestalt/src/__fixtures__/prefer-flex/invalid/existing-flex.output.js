import { Box, Flex } from 'gestalt';

export default function TestElement() {
  return (
    <Flex>
      <Box marginBottom={3} rounding={2} />
      <Flex alignItems="center" justifyContent="start" />
    </Flex>
  );
}
