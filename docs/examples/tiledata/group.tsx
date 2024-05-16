import { ReactNode, useState } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example() {
  const dataSources = [
    {
      id: 'data-1',
      name: 'MAU',
      value: '100M',
      color: '01',
      tooltip: 'Monthly active users',
    },
    {
      id: 'data-2',
      name: 'WAU',
      value: '80M',
      color: '02',
      tooltip: 'Weekly active users',
    },
    {
      id: 'data-3',
      name: 'DAU',
      value: '10M',
      color: '03',
      tooltip: 'Daily active users',
    },
  ];

  const allIds = dataSources.map(({ id }) => id);

  const [selectedItems, setSelectedItems] = useState(allIds);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      {dataSources.map(({ id, color, tooltip, name, value }) => (
        <TileData
          key={id}
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'DataVisualizationColors | undefined'.
          color={color}
          id={id}
          onTap={({ id: selectedId, selected }) => {
            if (!selectedId) {
              return;
            }

            setSelectedItems((currSelectedIds) =>
              !selected
                ? currSelectedIds.filter((tileId) => tileId !== selectedId)
                : currSelectedIds.concat([selectedId]),
            );
          }}
          selected={selectedItems.includes(id)}
          showCheckbox
          title={name}
// @ts-expect-error - TS2741 - Property 'children' is missing in type '{ text: string; }' but required in type 'ExtendedTooltipProps'.
          tooltip={{ text: tooltip }}
          trend={{ value: 20, accessibilityLabel: 'Trending up' }}
          value={value}
        />
      ))}
    </Flex>
  );
}
