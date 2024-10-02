import { Box, ButtonGroup, ButtonLink, Divider, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8}>
      <Flex
        alignContent="stretch"
        alignItems="stretch"
        direction="column"
        flex="grow"
        gap={{ column: 8, row: 0 }}
        width="100%"
      >
        <Flex alignContent="center" alignItems="center" direction="column" width="100%">
          <ButtonGroup>
            <ButtonLink color="gray" href="pinterest.com" size="lg" text="Visit" />
            <ButtonLink color="red" href="pinterest.com" size="lg" text="Save" />
          </ButtonGroup>
        </Flex>
        <Divider />
        <Flex direction="column" flex="grow" gap={{ column: 2, row: 0 }} width="100%">
          <ButtonLink
            color="red"
            fullWidth
            href="https://www.pinterest.com/"
            onClick={({ event }) => event.preventDefault()}
            size="lg"
            text="Learn more"
          />
          <ButtonLink
            color="gray"
            fullWidth
            href="https://gestalt.pinterest.systems/get_started/developers/installation"
            onClick={({ event }) => event.preventDefault()}
            size="lg"
            text="Install now"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
