import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="stretch"
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <ButtonToggle color="red" fullWidth size="lg" text="Create account" />
      <ButtonToggle color="gray" fullWidth size="lg" text="View settings" />
    </Flex>
  );
}
