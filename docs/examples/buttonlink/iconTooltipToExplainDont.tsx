import { ReactNode } from 'react';
import { ButtonLink, Flex, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="Click here to return to the home page">
        <ButtonLink
          color="red"
          disabled
          href="https://www.pinterest.com/"
          size="lg"
          text="Go back"
        />
      </Tooltip>
    </Flex>
  );
}
