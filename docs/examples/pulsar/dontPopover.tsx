import { Box, Flex, IconButton, Pulsar } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box position="relative">
        <IconButton accessibilityLabel="Example icon button" icon="filter" />

        <Box margin={-5} position="absolute" top>
          <Pulsar size={88} />
        </Box>
      </Box>
    </Flex>
  );
}
