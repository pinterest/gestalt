// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, Link, RadioGroup, Text } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [goal, setGoal] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="400">Primary company account goal</Heading>
          <Text size="200">
            Choose your primary goal for this account to help us better understand your needs
            <Text inline size="200" weight="bold">
              <Link display="inline" target="blank" href="https://www.pinterest.com/">
                Additional information
              </Link>
            </Text>
          </Text>
        </Flex>
        <RadioGroup legend="Primary company account goal" legendDisplay="hidden" id="legendExample">
          <RadioGroup.RadioButton
            checked={goal === 'sell'}
            id="sell"
            label="Sell more products"
            name="account goals"
            onChange={() => setGoal('sell')}
            value="sell"
          />
          <RadioGroup.RadioButton
            checked={goal === 'leads'}
            id="leads"
            label="Generate more leads for the company"
            name="account goals"
            onChange={() => setGoal('leads')}
            value="leads"
          />
          <RadioGroup.RadioButton
            checked={goal === 'interest'}
            id="interest"
            label="Create content on Pinterest to attract an audience"
            name="account goals"
            onChange={() => setGoal('interest')}
            value="interest"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
