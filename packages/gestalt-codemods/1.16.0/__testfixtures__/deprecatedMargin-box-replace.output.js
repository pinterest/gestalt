// @flow strict
import { Box, Box as Boxie } from 'gestalt';

export default function TestText() {
  return (
    <Boxie margin={1} fit>
      <Box marginTop={1} fit />
      <Box marginBottom={1} fit />
      <Box marginStart={1} marginEnd={1} fit />
    </Boxie>
  );
}
