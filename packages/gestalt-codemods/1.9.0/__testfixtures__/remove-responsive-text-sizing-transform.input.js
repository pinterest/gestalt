// @flow strict
import { Box, Heading as RenamedHeading, Text } from 'gestalt';

export default function TestText() {
  return (
    <Box>
      <Text size="md" truncate weight="bold">
        No changes, no presence of responsive size attributes
      </Text>
      <RenamedHeading lgSize="xs" mdSize="xs" size="lg" smSize="xs" truncate weight="bold">
        Refactors renamed component (Heading as RenamedHeading)
      </RenamedHeading>
      <Text lgSize="lg" mdSize="xs" smSize="xs" truncate weight="bold">
        Sets size value from lgSize
      </Text>
      <Text lgSize="xs" mdSize="xs" size="md" smSize="xs" truncate weight="bold">
        Removes all sizes
      </Text>
      <Text smSize="md" truncate weight="bold">
        Removes all sizes
      </Text>
    </Box>
  );
}
