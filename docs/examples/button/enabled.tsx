import { Button, ButtonGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <Button accessibilityLabel="Save" color="red" selected={false} size="lg" text="Save" />
        <Button accessibilityLabel="Follow" selected={false} size="lg" text="Follow" />
      </ButtonGroup>
    </Flex>
  );
}
