import {ReactNode} from 'react';
import { Box, Button, Flex, Pulsar } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box position="relative">
        <Button text="Visit" />

        <Box marginStart={-3} marginTop={-5} position="absolute" top>
          <Pulsar size={80} />
        </Box>
      </Box>

      <Box position="relative">
        <Button color="red" text="Save" />

        <Box marginStart={-2} marginTop={-5} position="absolute" top>
          <Pulsar size={78} />
        </Box>
      </Box>
    </Flex>
  );
}
