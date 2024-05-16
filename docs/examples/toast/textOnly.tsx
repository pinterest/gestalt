import { ReactNode } from 'react';
import { Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast text="Pin deleted" />
    </Flex>
  );
}
