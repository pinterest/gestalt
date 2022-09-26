// @flow strict
import { Box, Button, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button text="Create account" disabled size="lg" color="red" />
      <Box>
        <Tooltip text="You need to fill in a username to create an account">
          <IconButton
            accessibilityLabel="Additional info."
            bgColor="white"
            icon="info-circle"
            iconColor="gray"
            size="lg"
          />
        </Tooltip>
      </Box>
    </Flex>
  );
}
