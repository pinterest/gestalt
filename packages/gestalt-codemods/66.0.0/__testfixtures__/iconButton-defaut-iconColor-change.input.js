// @flow strict
import { Box, IconButton } from 'gestalt';

export default function TestComponent() {
  return (
    <Box>
      <IconButton
        bgColor="darkGray"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
      <IconButton
        bgColor="transparent"
        iconColor="red"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
      <IconButton
        bgColor="transparent"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
      <IconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
    </Box>
  );
}
