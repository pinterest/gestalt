import { Box, Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box height={150} width={150}>
        {' '}
        <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
          <Button
            accessibilityLabel="Save"
            backgroundContext="light"
            color="red"
            selected={false}
            size="lg"
            text="Save"
          />
        </Flex>
      </Box>
      <Box color="inverse" height={150} width={150}>
        <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
          <Button
            accessibilityLabel="Follow"
            backgroundContext="dark"
            selected={false}
            size="lg"
            text="Follow"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
