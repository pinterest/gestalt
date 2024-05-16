import {ReactNode} from 'react';
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button size="lg" text="Save" />
    </Flex>
  );
}
