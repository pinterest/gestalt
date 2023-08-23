// @flow strict
import { type Node } from 'react';
import { Box, Flex, RadioGroup, Text } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text size="400" weight="bold">
            Auto-renew subscription
          </Text>
          <Text size="200">Change will auto-save</Text>
        </Flex>
        <RadioGroup
          direction="row"
          legend="Auto-renew subscription"
          legendDisplay="hidden"
          id="bestPracticeFeedsDont"
        >
          <RadioGroup.RadioButton
            checked={false}
            id="on-dont"
            label="On"
            name="feed-dont"
            onChange={noop}
            value="on"
          />
          <RadioGroup.RadioButton
            checked={false}
            id="Off-do"
            label="Off"
            name="feed-dont"
            onChange={noop}
            value="Off"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
