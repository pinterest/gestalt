import { Box, ButtonGroup, ButtonToggle, Divider, Flex } from 'gestalt';

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
            <ButtonToggle color="gray" size="lg" text="Visit" />
            <ButtonToggle color="red" size="lg" text="Save" />
          </ButtonGroup>
        </Flex>
        <Divider />
        <Flex direction="column" flex="grow" gap={{ column: 2, row: 0 }} width="100%">
          <ButtonToggle color="red" fullWidth size="lg" text="Learn more" />
          <ButtonToggle color="gray" fullWidth size="lg" text="Install now" />
        </Flex>
      </Flex>
    </Box>
  );
}
