// @flow strict
import { type Node } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      alignItems="center"
      gap={{ column: 0, row: 2 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <ButtonLink text="Kontoeinst..." size="lg" color="gray" href="https://www.pinterest.com/" />
      <ButtonLink text="Neues We..." size="lg" color="red" href="https://www.pinterest.com/" />
    </Flex>
  );
}
