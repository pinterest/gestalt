// @flow strict
import {Box, Text as GestaltText} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <GestaltText size="sm">Test</GestaltText>
      <GestaltText size="md">Test</GestaltText>
      <GestaltText size="lg">Test</GestaltText>
      <GestaltText size={isCurrentPage ? "md" : "lg"}>Test</GestaltText>
    </Box>
  );
}
