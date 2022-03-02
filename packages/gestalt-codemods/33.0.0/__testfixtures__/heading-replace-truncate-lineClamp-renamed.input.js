// @flow strict
import { Box, Heading as GestaltHeading } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltHeading />
      <GestaltHeading truncate />
      <GestaltHeading truncate={false} />
      <GestaltHeading truncate={null} />
      <GestaltHeading truncate={undefined} />
    </Box>
  );
}
