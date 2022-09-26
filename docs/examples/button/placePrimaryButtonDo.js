// @flow strict
import { Box, Button, ButtonGroup, Divider, Flex } from 'gestalt';

export default function Example() {
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
            <Button text="Visit" size="lg" color="gray" />
            <Button text="Save" size="lg" color="red" />
          </ButtonGroup>
        </Flex>
        <Divider />
        <Flex gap={{ column: 2, row: 0 }} direction="column" flex="grow" width="100%">
          <Button text="Learn more" size="lg" color="red" fullWidth />
          <Button text="Install now" size="lg" color="gray" fullWidth />
        </Flex>
      </Flex>
    </Box>
  );
}
