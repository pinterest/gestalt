import { Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <IconButton accessibilityLabel="Go to next steps" icon="directional-arrow-right" />
    </Flex>
  );
}
