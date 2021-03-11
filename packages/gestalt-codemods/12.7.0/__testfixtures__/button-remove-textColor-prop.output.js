// @flow strict
import { Box, Button, Button as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Button text="Medium-sized button" inline />
      <Button text="Medium-sized button" inline color="transparent"/>
      <Button text="Medium-sized button" inline color="transparentWhiteText" />
      <Button text="Medium-sized button" inline color="red" />
      <Renamed text="Medium-sized button" inline />
    </Box>
  );
}
