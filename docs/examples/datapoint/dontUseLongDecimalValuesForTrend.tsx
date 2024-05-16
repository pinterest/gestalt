import { ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint
        size="lg"
        title="Saves"
        trend={{ value: -12.193, accessibilityLabel: 'Trending down' }}
        value="10,392"
      />
    </Box>
  );
}
