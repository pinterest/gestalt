// @flow strict
import { type Node } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" height="100%" width="100%" alignItems="center">
      <TileData
        color="01"
        title="Impressions"
        value="2M"
        selected
        trend={{ value: 5, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
