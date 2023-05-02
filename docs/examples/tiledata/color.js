// @flow strict
import { type Node } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex gap={4} wrap justifyContent="center">
      <TileData selectedColor="data-visualization-01" selected />
      <TileData selectedColor="data-visualization-02" selected />
      <TileData selectedColor="data-visualization-03" selected />
      <TileData selectedColor="data-visualization-04" selected />
      <TileData selectedColor="data-visualization-05" selected />
    </Flex>
  );
}
