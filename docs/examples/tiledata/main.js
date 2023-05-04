// @flow strict
import { type Node } from 'react';
import { TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <TileData
      title="Impressions"
      value="10M"
      selected
      trend={{ value: 29, accessibilityLabel: 'Trending up' }}
    />
  );
}
