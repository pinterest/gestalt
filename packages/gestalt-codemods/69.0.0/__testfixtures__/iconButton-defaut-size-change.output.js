// @flow strict
import { Box, IconButton } from 'gestalt';

export default function TestComponent() {
  return (
    <Box>
      <IconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        size="sm" />
      <IconButton accessibilityLabel="test 1" icon="directional-arrow-right" size="md" />
    </Box>
  );
}
