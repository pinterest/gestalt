// @flow strict
import { type Node } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <TileData tooltip={{ text: 'Weekly Active Users' }} title="WAU" value="1.25M" selected />{' '}
    </Flex>
  );
}
