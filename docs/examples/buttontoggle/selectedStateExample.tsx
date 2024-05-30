import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle accessibilityLabel="Saved" color="red" selected size="lg" text="Save" />
      <ButtonToggle accessibilityLabel="Following" selected size="lg" text="Following" />
    </Flex>
  );
}
