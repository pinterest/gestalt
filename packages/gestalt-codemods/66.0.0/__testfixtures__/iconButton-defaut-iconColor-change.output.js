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
        iconColor="gray" />
      <IconButton
        bgColor="white"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        iconColor="gray" />
      <IconButton
        bgColor="lightGray"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        iconColor="gray" />
      <IconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        iconColor="gray" />
    </Box>
  );
}
