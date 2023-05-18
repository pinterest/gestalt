// @flow strict
import { type Node, useState } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const allColors = ['01', '02', '03', '04', '05', '06', '08', '09', '10', '11', '12'];

  const [selectedColors, setSelectedColors] = useState(allColors);

  return (
    <Flex gap={4} wrap justifyContent="center">
      {allColors.map((color) => (
        <TileData
          id={color}
          key={color}
          color={color}
          selected={selectedColors.includes(color)}
          onTap={({ id: selectedId, selected }) => {
            if (!selectedId) {
              return;
            }

            setSelectedColors((currSelectedColors) =>
              !selected
                ? currSelectedColors.filter((tileId) => tileId !== selectedId)
                : currSelectedColors.concat([selectedId]),
            );
          }}
          title={`Color ${color}`}
          value="41.25m"
        />
      ))}
    </Flex>
  );
}
