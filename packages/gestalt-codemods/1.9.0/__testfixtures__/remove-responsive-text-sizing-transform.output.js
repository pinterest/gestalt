// @flow strict
import { Box, Heading as RenamedHeading, Text } from 'gestalt';

export default function TestText() {
  return (
    <Box>
      <Text size="md" truncate weight="bold">
        No changes, no presence of responsive size attributes
      </Text>
      <RenamedHeading size="lg" truncate weight="bold">
        Refactors renamed component (Heading as RenamedHeading)
      </RenamedHeading>
      <Text size="lg" truncate weight="bold">
        Sets size value from lgSize
      </Text>
      <Text truncate weight="bold">
        Removes all sizes
      </Text>
      <Text truncate weight="bold">
        Removes all sizes
      </Text>
    </Box>
  );
}
