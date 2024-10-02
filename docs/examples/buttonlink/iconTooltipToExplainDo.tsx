import { Box, ButtonLink, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        color="red"
        disabled
        href="https://www.pinterest.com/"
        onClick={({ event }) => event.preventDefault()}
        size="lg"
        text="Visit Pinterest"
      />
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
