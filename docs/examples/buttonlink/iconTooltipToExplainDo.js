// @flow strict
import { type Node } from 'react';
import { Box, ButtonLink, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        text="Visit Pinterest"
        disabled
        size="lg"
        color="red"
        href="https://www.pinterest.com/"
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
