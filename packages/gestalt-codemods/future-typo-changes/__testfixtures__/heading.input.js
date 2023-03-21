// @flow strict
import {Box, Heading} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <Heading size="sm">Test</Heading>
      <Heading size="md">Test</Heading>
      <Heading size="lg">Test</Heading>
      <Heading size={isCurrentPage ? "sm" : "md"}>Test</Heading>
      <Heading size={isCurrentPage ? "sm" : 20}>Test</Heading>
      <Heading size={isCurrentPage ? 50 : "lg"}>Test</Heading>
    </Box>
  );
}
