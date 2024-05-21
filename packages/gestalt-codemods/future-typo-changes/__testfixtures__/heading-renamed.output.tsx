// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Box, Heading as GestaltHeading} from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltHeading size="400">Test</GestaltHeading>
      <GestaltHeading size="500">Test</GestaltHeading>
      <GestaltHeading size="600">Test</GestaltHeading>
    </Box>
  );
}
