// @flow strict
import {Box, Heading} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <Heading size="400">Test</Heading>
      <Heading size="500">Test</Heading>
      <Heading size="600">Test</Heading>
      <Heading size={isCurrentPage ? "400" : "500"}>Test</Heading>
      <Heading size={isCurrentPage ? "400" : 20}>Test</Heading>
      <Heading size={isCurrentPage ? 50 : "600"}>Test</Heading>
    </Box>
  );
}
