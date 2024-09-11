import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <ButtonToggle
        accessibilityLabel="sparkle"
        iconStart="sparkle"
        selected={false}
        size="lg"
        text=""
      />
      <ButtonToggle
        accessibilityLabel="sparkle"
        hasDropdown
        iconStart="sparkle"
        selected={false}
        size="lg"
        text=""
      />
    </Flex>
  );
}
