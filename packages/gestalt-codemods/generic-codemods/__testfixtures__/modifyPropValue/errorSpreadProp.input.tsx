// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  const props = {}
  return (
    <Box {...props} width={400}>
      <Box {...props} >
        <Box/>
        <Flex {...props} width={400}/>
      </Box>
    </Box>
  );
}
