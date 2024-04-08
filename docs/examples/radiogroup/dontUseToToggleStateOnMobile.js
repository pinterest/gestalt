// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, RadioGroup, Text } from 'gestalt';

const noop = () => {};

export default function RadioButtonExample(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text size="400" weight="bold">
            Auto-renew subscription
          </Text>
          <Text size="200">Change will auto-save</Text>
        </Flex>
        <RadioGroup
          direction="row"
          id="bestPracticeFeedsDont"
          legend="Auto-renew subscription"
          legendDisplay="hidden"
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
