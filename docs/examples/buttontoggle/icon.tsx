import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle iconStart="sparkle" selected={false} size="lg" text="Follow" />
    </Flex>
  );
}
