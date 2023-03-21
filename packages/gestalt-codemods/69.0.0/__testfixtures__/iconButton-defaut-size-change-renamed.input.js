// @flow strict
import { Box, IconButton as RenamedIconButton } from 'gestalt';

export default function TestComponent() {
  return (
    <Box>
      <RenamedIconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        size="sm" />
      <RenamedIconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right" />
    </Box>
  );
}
