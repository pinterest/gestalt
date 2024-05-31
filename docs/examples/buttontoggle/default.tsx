import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle selected={false} size="lg" text="Follow" />
        <ButtonToggle color="red" selected={false} size="lg" text="Save" />
      </ButtonGroup>
    </Flex>
  );
}
