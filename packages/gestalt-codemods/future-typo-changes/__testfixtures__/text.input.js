// @flow strict
import {Box, Text} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <Text size="sm">Test</Text>
      <Text size="md">Test</Text>
      <Text size="lg">Test</Text>
      <Text size={isCurrentPage ? "sm" : "md" }>Test</Text>
      <Text size={isCurrentPage ? "sm" : 10 }>Test</Text>
      <Text size={isCurrentPage ? 10 : "md" }>Test</Text>
    </Box>
  );
}
