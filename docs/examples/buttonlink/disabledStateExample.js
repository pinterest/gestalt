// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Go back"
        disabled
        href="https://www.pinterest.com/"
        size="lg"
        text="Go back"
      />
    </Flex>
  );
}
