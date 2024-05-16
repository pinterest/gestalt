import { useState } from 'react';
import { Box, Flex, TagData } from 'gestalt';

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

export default function Example() {
  const allColors: ReadonlyArray<DataVisualizationColors> = [
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
    <Box height="90%" overflow="scrollY" padding={2}>
      <Flex gap={4} justifyContent="center" wrap>
        {allColors.map((color) => (
          // @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ key: DataVisualizationColors; color: DataVisualizationColors; id: DataVisualizationColors; onTap: ({ id: selectedId, selected }: { ...; } & { ...; }) => void; selected: boolean; showCheckbox: true; text: string; }' but required in type 'TagDataProps'.
          <TagData
            key={color}
            color={color}
            id={color}
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
            selected={selectedColors.includes(color)}
            showCheckbox
            text={`Color ${color}`}
          />
        ))}
      </Flex>
    </Box>
  );
}
