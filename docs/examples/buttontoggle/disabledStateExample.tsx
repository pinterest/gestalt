import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle accessibilityLabel="Save" color="red" selected={false} size="lg" text="Save" />
      <ButtonToggle accessibilityLabel="Follow" disabled selected={false} size="lg" text="Follow" />
    </Flex>
  );
}
