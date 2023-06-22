// @flow strict
import { type Node, useState } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
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
    <Flex gap={4} justifyContent="center" alignItems="center" width="100%" height="100%" wrap>
      {dataSources.map(({ id, color, tooltip, name, value }) => (
        <TileData
          key={id}
          id={id}
          showCheckbox
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
          color={color}
          tooltip={{ text: tooltip }}
          title={name}
          value={value}
          trend={{ value: 20, accessibilityLabel: 'Trending up' }}
        />
      ))}
    </Flex>
  );
}
