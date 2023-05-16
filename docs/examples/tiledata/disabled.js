// @flow strict
import { type Node } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center">
      <TileData
        tooltip={{ text: 'Weekly Active Users' }}
        title="WAU"
        value="1.25M"
        disabled
        trend={{ value: 20, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
