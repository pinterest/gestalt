// @flow strict
import { type Node, useState } from 'react';
import { Box, TileData, Flex } from 'gestalt';

type DataVisualizationColors =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

export default function Example(): Node {
  const allColors: $ReadOnlyArray<DataVisualizationColors> = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const [selectedColors, setSelectedColors] = useState(allColors);

  return (
    <Box overflow="scrollY" height="90%" padding={2}>
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
                  ? currSelectedColors.filter((tileId) => tileId !== color)
                  : currSelectedColors.concat([color]),
              );
            }}
            title={`Color ${color}`}
            value="41.25m"
          />
        ))}
      </Flex>
    </Box>
  );
}
