import { Flex, Indicator } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
      <Indicator accessibilityLabel="Visit the Gestalt documentation" />
    </Flex>
  );
}
