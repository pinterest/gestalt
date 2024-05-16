import {ReactNode} from 'react';
import { Flex, TileData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <TileData title="WAU" tooltip={{ text: 'Weekly Active Users' }} value="1.25M" />{' '}
      <TileData
        selected
        title="MAU"
        tooltip={{
          text: [
            'Monthly Active Users',
            'The total monthly users over the last 30 days',
            'MAU has gone up by 10% over the last 30 days',
          ],
        }}
        trend={{ value: 10, accessibilityLabel: 'Increased by 10%' }}
        value="2.25M"
      />{' '}
    </Flex>
  );
}
