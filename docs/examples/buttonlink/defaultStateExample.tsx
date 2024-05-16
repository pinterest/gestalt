import { ReactNode } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        color="red"
        href="https://www.pinterest.com/"
        size="lg"
        text="Visit Pinterest"
      />
    </Flex>
  );
}
