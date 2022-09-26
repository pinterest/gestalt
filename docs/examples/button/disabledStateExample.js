// @flow strict
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button accessibilityLabel="Submit" disabled text="Submit" size="lg" />{' '}
    </Flex>
  );
}
