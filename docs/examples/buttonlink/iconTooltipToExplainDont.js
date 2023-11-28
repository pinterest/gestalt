// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonLink, Flex, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="Click here to return to the home page">
        <ButtonLink
          text="Go back"
          disabled
          size="lg"
          color="red"
          href="https://www.pinterest.com/"
        />
      </Tooltip>
    </Flex>
  );
}
