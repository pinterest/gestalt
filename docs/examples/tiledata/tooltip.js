// @flow strict
import { type Node } from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%" gap={2}>
      <TileData tooltip={{ text: 'Weekly Active Users' }} title="WAU" value="1.25M" />{' '}
      <TileData
        tooltip={{
          text: [
            'Monthly Active Users',
            'The total monthly users over the last 30 days',
            'MAU has gone up by 10% over the last 30 days',
          ],
        }}
        title="MAU"
        value="2.25M"
        selected
        trend={{ value: 10, accessibilityLabel: 'Increased by 10%' }}
      />{' '}
    </Flex>
  );
}
