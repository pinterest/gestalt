// @flow strict
import { type Node, useState } from 'react';
import { TileData, Flex } from 'gestalt';

export default function Example(): Node {
  const [selectedTileId, setSelectedTileId] = useState('1');

  const isSelected = (id: string) => selectedTileId === id;
  const handleSelection = (ev) => {
    setSelectedTileId(ev.id);
  };

  return (
    <Flex gap={4} wrap justifyContent="center">
      <TileData
        id="1"
        color="data-visualization-01"
        selected={isSelected('1')}
        onChange={handleSelection}
        title="Impressions"
        value="41.25m"
      />
      <TileData
        id="2"
        color="data-visualization-02"
        selected={isSelected('2')}
        onChange={handleSelection}
        title="CPM"
        value="$1.57"
      />
      <TileData
        id="3"
        color="data-visualization-03"
        selected={isSelected('3')}
        onChange={handleSelection}
        title="CPC"
        value="$1.57"
      />
      <TileData
        id="4"
        color="data-visualization-04"
        selected={isSelected('4')}
        onChange={handleSelection}
        title="ROAS"
        value="$1.57"
      />
      <TileData
        id="5"
        color="data-visualization-05"
        selected={isSelected('5')}
        onChange={handleSelection}
        title="Spend"
        value="$1.57"
      />
    </Flex>
  );
}
