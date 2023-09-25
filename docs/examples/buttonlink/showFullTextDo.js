// @flow strict
import { type Node } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      gap={{ column: 2, row: 0 }}
      direction="column"
      alignContent="stretch"
      alignItems="center"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <ButtonLink
        text="Create account"
        size="lg"
        color="red"
        fullWidth
        href="https://www.pinterest.com/"
      />
      <ButtonLink
        text="View settings"
        size="lg"
        color="gray"
        fullWidth
        href="https://www.pinterest.com/"
      />
    </Flex>
  );
}
