import { ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint size="lg" title="Leistung" value="3.000,25" />
    </Box>
  );
}
