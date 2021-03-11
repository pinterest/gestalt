// @flow strict
import { Box, Button, Button as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Button text="Medium-sized button" inline textColor="red"/>
      <Button text="Medium-sized button" inline color="transparent"/>
      <Button text="Medium-sized button" inline textColor="white" color="transparent" />
      <Button text="Medium-sized button" inline textColor="white" color="red"/>
      <Renamed text="Medium-sized button" inline textColor="red"/>
    </Box>
  );
}
