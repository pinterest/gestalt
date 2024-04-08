// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TileData
        color="01"
        title="Impressions"
        trend={{ value: 5, accessibilityLabel: 'Trending up' }}
        value="2M"
      />
    </Flex>
  );
}
