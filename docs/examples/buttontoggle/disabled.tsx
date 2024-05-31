import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle disabled selected={false} size="lg" text="Follow" />
        <ButtonToggle color="red" disabled selected={false} size="lg" text="Save" />
        <ButtonToggle disabled selected size="lg" text="Following" />
        <ButtonToggle color="red" disabled selected size="lg" text="Saved" />
      </ButtonGroup>
    </Flex>
  );
}
