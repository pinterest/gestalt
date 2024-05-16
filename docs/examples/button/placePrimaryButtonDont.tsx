import { ReactNode } from 'react';
import { Button, ButtonGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <Button color="red" size="lg" text="Visit" />
        <Button color="red" size="lg" text="Save" />
      </ButtonGroup>
    </Flex>
  );
}
