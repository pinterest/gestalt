// @flow strict
import { type Node, useState } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
  const [selectedId, setSelectedId] = useState<string | void>('01');
  const isSelected = (id: string) => selectedId === id;

  return (
    <Flex gap={5} justifyContent="center" alignItems="center" width="100%" height="100%">
      <TileData
        id="01"
        title="Impressions"
        value="10M"
        selected={isSelected('01')}
        onTap={({ id }) => {
          setSelectedId(id);
        }}
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
      <TileData
        id="02"
        title="Impressions"
        value="2M"
        selected={isSelected('02')}
        onTap={({ id }) => {
          setSelectedId(id);
        }}
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
    </Flex>
  );
}
