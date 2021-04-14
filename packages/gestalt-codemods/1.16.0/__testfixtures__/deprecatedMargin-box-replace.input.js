// @flow strict
import { Box, Box as Boxie } from 'gestalt';

export default function TestText() {
  return (
    <Boxie deprecatedMargin={1} fit>
      <Box deprecatedMargin={{top: 1}} fit />
      <Box deprecatedMargin={{ bottom: 1}} fit />
      <Box deprecatedMargin={{left: 1, right: 1}} fit />
    </Boxie>
  );
}
