// @flow strict
import { type Node, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  const dataSources = [
    {
      id: 'data-1',
      name: 'Monthly Active',
      color: '01',
      tooltip: 'Monthly active users',
    },
    {
      id: 'data-2',
      name: 'Weekly Active',
      color: '02',
      tooltip: 'Weekly active users',
    },
    {
      id: 'data-3',
      name: 'Daily Active',
      color: '03',
      tooltip: 'Daily active users',
    },
  ];

  const allIds = dataSources.map(({ id }) => id);

  const [data, setData] = useState(dataSources);

  const [selectedItems, setSelectedItems] = useState(allIds);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%" gap={2}>
      {data.map(({ id, color, tooltip, name }) => (
        <TagData
          key={id}
          id={id}
          color={color}
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
          onRemove={({ id: selectedId }) => {
            if (!selectedId) {
              return;
            }

            setData((currData) => currData.filter((tile) => tile.id !== selectedId));
          }}
          selected={selectedItems.includes(id)}
          tooltip={{ text: tooltip }}
          text={name}
        />
      ))}
    </Flex>
  );
}
