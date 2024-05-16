import { Box, Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
        <Toast
          dismissButton={{ onDismiss: () => {} }}
          text="You blocked this user. They won't see your Pins unless you unblock them."
        />
      </Flex>
    </Box>
  );
}
