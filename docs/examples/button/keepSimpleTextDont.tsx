import { ReactNode } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignContent="center" height="100%" justifyContent="center" width="100%">
      <Button color="red" iconEnd="person-add" size="lg" text="Create new Pinterest account" />
    </Flex>
  );
}
