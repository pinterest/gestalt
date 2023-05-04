// @flow strict
import { type Node } from 'react';
import { TileData } from 'gestalt';

export default function Example(): Node {
  return <TileData tooltip="Weekly Active Users" title="WAU" value="1.25M" selected />;
}
