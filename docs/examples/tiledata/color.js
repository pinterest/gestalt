// @flow strict
import { type Node } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const allColors = ['01', '02', '03', '04', '05', '06', '08', '09', '10', '11', '12'];

  return (
    <Flex gap={4} wrap justifyContent="center">
      {allColors.map((color) => (
        <TileData
          key={color}
          color={color}
          selected
          onChange={() => {}}
          title={`Color ${color}`}
          value="41.25m"
        />
      ))}
    </Flex>
  );
}
