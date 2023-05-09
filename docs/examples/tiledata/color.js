// @flow strict
import { type Node, useState } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const [selectedTileId, setSelectedTileId] = useState('1');

  const isSelected = (id: string) => selectedTileId === id;
  const handleSelection = ({ id }) => {
    setSelectedTileId(id);
  };

  return (
    <Flex gap={4} wrap justifyContent="center">
      <TileData
        id="1"
        color="01"
        selected={isSelected('1')}
        onChange={handleSelection}
        title="Impressions"
        value="41.25m"
      />
      <TileData
        id="2"
        color="02"
        selected={isSelected('2')}
        onChange={handleSelection}
        title="CPM"
        value="$1.57"
      />
      <TileData
        id="4"
        color="04"
        selected={isSelected('4')}
        onChange={handleSelection}
        title="CPC"
        value="$1.57"
      />
      <TileData
        id="5"
        color="05"
        selected={isSelected('5')}
        onChange={handleSelection}
        title="ROAS"
        value="$1.57"
      />
      <TileData
        id="6"
        color="06"
        selected={isSelected('6')}
        onChange={handleSelection}
        title="Spend"
        value="$1.57"
      />
    </Flex>
  );
}
