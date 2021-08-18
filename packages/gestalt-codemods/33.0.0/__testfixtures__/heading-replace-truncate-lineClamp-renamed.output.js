// @flow strict
import { Box, Heading as GestaltHeading } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltHeading />
      <GestaltHeading lineClamp={1} />
      <GestaltHeading />
      <GestaltHeading />
      <GestaltHeading />
    </Box>
  );
}
