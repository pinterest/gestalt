import { Flex, TileData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TileData
        disabled
        title="WAU"
        tooltip={{ text: 'Weekly Active Users' }}
        trend={{ value: 20, accessibilityLabel: 'Trending up' }}
        value="1.25M"
      />
    </Flex>
  );
}
