// @flow strict
import {Box, Text} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <Text size="100">Test</Text>
      <Text size="200">Test</Text>
      <Text size="300">Test</Text>
      <Text size={isCurrentPage ? "100" : "200" }>Test</Text>
    </Box>
  );
}
