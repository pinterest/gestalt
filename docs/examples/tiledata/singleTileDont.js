// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex justifyContent="center" height="100%" width="100%" alignItems="center">
      <TileData
        color="01"
        title="Impressions"
        value="2M"
        trend={{ value: 5, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
