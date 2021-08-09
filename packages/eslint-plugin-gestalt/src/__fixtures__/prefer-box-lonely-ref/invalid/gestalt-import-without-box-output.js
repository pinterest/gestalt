import { useRef } from 'react';
import { Box, Flex, Text } from 'gestalt';
export default function TestElement() {
  const ref = useRef(null);
  return (
    <Box ref={ref}>
      <Text>Test</Text>
    </Box>
  );
}
