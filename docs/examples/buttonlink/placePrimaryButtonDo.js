// @flow strict
import { type Node } from 'react';
import { Box, ButtonGroup, ButtonLink, Divider, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8}>
      <Flex
        gap={{ column: 8, row: 0 }}
        direction="column"
        alignItems="stretch"
        alignContent="stretch"
        flex="grow"
        width="100%"
      >
        <Flex direction="column" alignItems="center" alignContent="center" width="100%">
          <ButtonGroup>
            <ButtonLink text="Visit" size="lg" color="gray" href="pinterest.com" />
            <ButtonLink text="Save" size="lg" color="red" href="pinterest.com" />
          </ButtonGroup>
        </Flex>
        <Divider />
        <Flex gap={{ column: 2, row: 0 }} direction="column" flex="grow" width="100%">
          <ButtonLink
            text="Learn more"
            size="lg"
            color="red"
            fullWidth
            href="https://gestalt.pinterest.systems/"
          />
          <ButtonLink
            text="Install now"
            size="lg"
            color="gray"
            fullWidth
            href="https://gestalt.pinterest.systems/get_started/developers/installation"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
