// @flow strict
import { Box, IconButton as RenamedIconButton } from 'gestalt';

export default function TestComponent() {
  return (
    <Box>
      <RenamedIconButton
        bgColor="darkGray"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
      <RenamedIconButton
        bgColor="transparent"
        iconColor="red"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
      />
      <RenamedIconButton
        bgColor="transparent"
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        iconColor="gray" />
      <RenamedIconButton
        accessibilityLabel="test 1"
        icon="directional-arrow-right"
        iconColor="gray" />
    </Box>
  );
}
