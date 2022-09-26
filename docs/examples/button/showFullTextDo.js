// @flow strict
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      gap={{ column: 2, row: 0 }}
      direction="column"
      alignContent="stretch"
      alignItems="center"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Button text="Create account" size="lg" color="red" fullWidth />
      <Button text="View settings" size="lg" color="gray" fullWidth />
    </Flex>
  );
}
