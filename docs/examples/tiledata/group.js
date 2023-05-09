// @flow strict
import { useState, type Node } from 'react';
import { TileData, Flex } from 'gestalt';

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
      id: 'data-4',
      name: 'DAU',
      value: '10M',
      color: '04',
      tooltip: 'Daily active users',
    },
  ];

  const allIds = dataSources.map(({ id }) => id);

  const [selectedItems, setSelectedItems] = useState(allIds);

  const handleSelect = ({ id, selected }) => {
    let selectedIds = [];
    if (selected) {
      selectedIds = selectedItems.filter((tileId) => tileId !== id);
    } else {
      selectedIds = selectedItems.concat([id]);
    }
    setSelectedItems(selectedIds);
  };

  return (
    <Flex gap={4}>
      {dataSources.map(({ id, color, tooltip, name, value }) => (
        <TileData
          key={id}
          showCheckbox
          onSelected={handleSelect}
          selected={selectedItems.includes(id)}
          color={color}
          tooltip={{ text: tooltip }}
          title={name}
          value={value}
        />
      ))}
    </Flex>
  );
}
