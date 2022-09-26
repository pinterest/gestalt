// @flow strict
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      gap={{ column: 0, row: 2 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Button text="Kontoeinst..." size="lg" color="gray" />
      <Button text="Neues We..." size="lg" color="red" />
    </Flex>
  );
}
