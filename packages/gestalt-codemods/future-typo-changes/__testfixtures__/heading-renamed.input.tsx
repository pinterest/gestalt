// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Box, Heading as GestaltHeading} from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltHeading size="sm">Test</GestaltHeading>
      <GestaltHeading size="md">Test</GestaltHeading>
      <GestaltHeading size="lg">Test</GestaltHeading>
    </Box>
  );
}
