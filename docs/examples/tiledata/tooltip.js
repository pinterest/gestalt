// @flow strict
import { type Node } from 'react';
import { Flex, Text, TileData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%" gap={2}>
      <TileData tooltip={{ text: 'Weekly Active Users' }} title="WAU" value="1.25M" />{' '}
      <TileData
        tooltip={{
          text: (
            <Text>
              <strong>Monthly Active Users</strong>
              <p>The total monthly users over the last 30 days</p>
              <p>MAU has gone up by 10% over the last 30 days</p>
            </Text>
          ),
        }}
        title="MAU"
        value="2.25M"
        selected
        trend={{ value: 10, accessibilityLabel: 'Increased by 10%' }}
      />{' '}
    </Flex>
  );
}
