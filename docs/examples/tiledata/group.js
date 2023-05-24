// @flow strict
import { useState, type Node } from 'react';
import { Box, TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const DataSources = [
    {
      id: 'data-1',
      name: 'MAU',
      value: 100,
      color: 'data-visualization-01',
      tooltip: 'Monthly active users',
    },
    {
      id: 'data-2',
      name: 'WAU',
      value: 80,
      color: 'data-visualization-02',
      tooltip: 'Weekly active users',
    },
    {
      id: 'data-3',
      name: 'DAU',
      value: 10,
      color: 'data-visualization-03',
      tooltip: 'Daily active users',
    },
  ];

  // add all elements to our map
  const selectedMap = DataSources.reduce((acc, tile, idx) => {
    acc[tile.id] = tile.id;
    return acc;
  }, {});

  const [selectedItems, setSelectedItems] = useState(selectedMap);

  const handleSelect = (id: string, isSelected: boolean) => {
    const itemsCopy = Object.assign(selectedItems, {});
    if (itemsCopy[id]) {
      delete 'id' in itemsCopy;
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
          selectedColor={tile.color}
          tooltip={tile.tooltip}
        />
      ))}
    </Flex>
  );
}
