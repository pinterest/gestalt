// @flow strict
import { type Node } from 'react';
import { TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <TileData
      tooltip={{ text: 'Weekly Active Users' }}
      title="WAU"
      value="1.25M"
      disabled
      trend={{ value: 20, accessibilityLabel: 'Trending up' }}
    />
  );
}
