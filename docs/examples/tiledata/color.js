// @flow strict
import { type Node, useState } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const [selectedTileId, setSelectedTileId] = useState('1');

  const isSelected = (id: string) => selectedTileId === id;

  return (
    <Flex gap={4} wrap justifyContent="center">
      <TileData
        id="1"
        color="01"
        selected={isSelected('1')}
        onChange={({ id }) => setSelectedTileId(id)}
        title="Impressions"
        value="41.25m"
      />
      <TileData
        id="2"
        color="02"
        selected={isSelected('2')}
        onChange={({ id }) => setSelectedTileId(id)}
        title="CPM"
        value="$1.57"
      />
      <TileData
        id="4"
        color="04"
        selected={isSelected('4')}
        onChange={({ id }) => setSelectedTileId(id)}
        title="CPC"
        value="$1.57"
      />
      <TileData
        id="5"
        color="05"
        selected={isSelected('5')}
        onChange={({ id }) => setSelectedTileId(id)}
        title="ROAS"
        value="$1.57"
      />
      <TileData
        id="6"
        color="06"
        selected={isSelected('6')}
        onChange={({ id }) => setSelectedTileId(id)}
        title="Spend"
        value="$1.57"
      />
    </Flex>
  );
}
