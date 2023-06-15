// @flow strict
import { type Node } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex gap={2} height="100%" width="100%" alignItems="center" justifyContent="center">
      <TileData
        color="01"
        title="Impressions"
        selected
        value="2M"
        showCheckbox
        trend={{ value: 1, accessibilityLabel: 'Trending up' }}
      />
      <TileData
        color="02"
        title="Impressions"
        selected
        showCheckbox
        value="2M"
        trend={{ value: 1, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
