import { ReactNode } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel=""
        href="https://www.pinterest.com/"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
      />
    </Flex>
  );
}
