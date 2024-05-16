import { ReactNode, useState } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example() {
  const [selectedId, setSelectedId] = useState<string | undefined>('01');
  const isSelected = (id: string) => selectedId === id;

  return (
    <Flex alignItems="center" gap={5} height="100%" justifyContent="center" width="100%">
      <TileData
        id="01"
        onTap={({ id }) => {
          setSelectedId(id);
        }}
        selected={isSelected('01')}
        title="Impressions"
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
        value="10M"
      />
      <TileData
        id="02"
        onTap={({ id }) => {
          setSelectedId(id);
        }}
        selected={isSelected('02')}
        title="Impressions"
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
        value="2M"
      />
    </Flex>
  );
}
