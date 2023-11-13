// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        color="red"
        text="Visit Pinterest"
        size="lg"
        href="https://www.pinterest.com/"
      />
    </Flex>
  );
}
