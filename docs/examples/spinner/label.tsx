import { Box, Flex, Spinner, useReducedMotion } from 'gestalt';

export default function Example() {
  const reduced = useReducedMotion();
  return (
    <Box height="100%" width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Spinner label="We’re adding new ideas to your homefeed" show={!reduced} />
      </Flex>
    </Box>
  );
}
