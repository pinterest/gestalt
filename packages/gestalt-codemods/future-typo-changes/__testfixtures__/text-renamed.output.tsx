// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Box, Text as GestaltText} from 'gestalt';

export default function TestBox({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}){
  return (
    <Box>
      <GestaltText size="100">Test</GestaltText>
      <GestaltText size="200">Test</GestaltText>
      <GestaltText size="300">Test</GestaltText>
      <GestaltText size={isCurrentPage ? "200" : "300"}>Test</GestaltText>
    </Box>
  );
}
