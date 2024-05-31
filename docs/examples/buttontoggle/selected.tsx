import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle color="red" selected size="lg" text="Saved" />
        <ButtonToggle selected size="lg" text="Following" />
      </ButtonGroup>
    </Flex>
  );
}
