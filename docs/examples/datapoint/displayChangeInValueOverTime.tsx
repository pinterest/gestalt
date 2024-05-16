import {ReactNode} from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Datapoint
          title="Pin clicks"
          trend={{ value: 12, accessibilityLabel: 'Trending up' }}
          value="1.23k"
        />
        <Datapoint title="Saves" trend={{ value: 0, accessibilityLabel: '' }} value="123" />
        <Datapoint
          title="Total impressions"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
          value="1.23m"
        />
      </Flex>
    </Box>
  );
}
