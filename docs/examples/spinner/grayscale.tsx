import { Box, Flex, Spinner, useReducedMotion } from 'gestalt';

export default function Example() {
  const reduced = useReducedMotion();
  return (
    <Box height="100%" width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Spinner color="grayscale" show={!reduced} />
      </Flex>
    </Box>
  );
}
