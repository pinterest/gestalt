import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box>
        <Box color="errorBase" height={100} marginTop={4} width="100%">
          <Box color="infoBase" height={100} marginTop={2}>
            <Box color="selected" height={100} marginTop={3}>
              <Text color="light" weight="bold">
                These margins are all collapsed
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box color="errorBase" height={100} marginTop={4} paddingY={1} width="100%">
          <Box color="infoBase" height={100} paddingY={2}>
            <Box color="selected" height={100} padding={2}>
              <Text color="light" weight="bold">
                These margins are not collapsed because they use padding
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
