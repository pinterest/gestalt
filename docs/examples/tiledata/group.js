// @flow strict
import { useState, type Node } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const DataSources = [
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

  // add all elements to our map
  const selectedMap = DataSources.reduce((acc, tile) => {
    acc[tile.id] = tile.id;
    return acc;
  }, {});

  const [selectedItems, setSelectedItems] = useState(selectedMap);

  const handleSelect = ({ id }) => {
    const itemsCopy = Object.assign(selectedItems, {});
    if (itemsCopy[id]) {
      delete itemsCopy.id;
      setSelectedItems(itemsCopy);
    } else {
      itemsCopy[id] = id;
    }
    setSelectedItems(itemsCopy);
  };

  return (
    <Flex gap={4}>
      {DataSources.map((tile) => (
        <TileData
          key={tile.id}
          showCheckbox
          onSelected={handleSelect}
          selected={!!selectedItems[tile.id]}
          color={tile.color}
          tooltip={tile.tooltip}
          title={tile.name}
          value={tile.value}
        />
      ))}
    </Flex>
  );
}
