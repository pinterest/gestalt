import { Flex, TileData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <TileData
        color="01"
        selected
        showCheckbox
        title="Impressions"
        trend={{ value: 1, accessibilityLabel: 'Trending up' }}
        value="2M"
      />
      <TileData
        color="02"
        selected
        showCheckbox
        title="Impressions"
        trend={{ value: 1, accessibilityLabel: 'Trending up' }}
        value="2M"
      />
    </Flex>
  );
}
