// @flow strict
import { Box, Toast, Toast as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Toast text="Simple Toast" />
      <Toast text="Simple Toast" color="red"/>
      <Toast text="Simple Toast" />
      <Toast text="Simple Toast" />
      <Renamed text="Simple Toast" />
    </Box>
  );
}
