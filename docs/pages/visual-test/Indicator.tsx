import { Box, Flex,Indicator } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
        <Indicator accessibilityLabel="Visit the Gestalt documentation" />
        <Indicator accessibilityLabel="Visit the Gestalt documentation" count={3} />
        <Indicator accessibilityLabel="Visit the Gestalt documentation" count={11} />
        <Indicator accessibilityLabel="Visit the Gestalt documentation" count={86} />
        <Indicator accessibilityLabel="Visit the Gestalt documentation" count={100} />
      </Flex>
    </Box>
  );
}
