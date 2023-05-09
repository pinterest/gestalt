// @flow strict
import { type Node } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex gap={5}>
      <TileData
        title="Impressions"
        value="10M"
        selected
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
      <TileData
        title="Impressions"
        value="2M"
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
