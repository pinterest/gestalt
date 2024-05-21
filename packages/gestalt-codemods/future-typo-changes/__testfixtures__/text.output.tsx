// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
      <Text size={isCurrentPage ? "100" : 10 }>Test</Text>
      <Text size={isCurrentPage ? 10 : "200" }>Test</Text>
    </Box>
  );
}
