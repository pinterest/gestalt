import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button
        accessibilityLabel="AI Options"
        iconEnd="arrow-down"
        iconStart="sparkle"
        size="lg"
        text="AI Options"
      />
    </Flex>
  );
}
