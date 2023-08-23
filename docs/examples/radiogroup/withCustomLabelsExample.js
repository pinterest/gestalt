// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, IconButton, Label, RadioGroup, Text } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [favorite, setFavorite] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="Campaign budget" id="bestPracticeBudget">
        <Flex gap={{ row: 2, column: 0 }} alignItems="center">
          <RadioGroup.RadioButton
            checked={favorite === 'daily'}
            id="daily-label-ex-custom"
            name="budget-custom-label"
            onChange={() => setFavorite('daily')}
            value="daily"
          />
          <Label htmlFor="daily-label-ex-custom">
            <Flex alignItems="center">
              <Text>Daily</Text>
              <IconButton
                size="sm"
                icon="info-circle"
                iconColor="gray"
                accessibilityLabel="info"
                tooltip={{ text: 'Sets a cap for the amount your campaign can spend each day' }}
              />
            </Flex>
          </Label>
        </Flex>
        <Flex gap={{ row: 2, column: 0 }} alignItems="center">
          <RadioGroup.RadioButton
            checked={favorite === 'lifetime'}
            id="lifetime-label-ex-custom"
            name="budget-custom-label"
            onChange={() => setFavorite('lifetime')}
            value="lifetime"
          />
          <Label htmlFor="lifetime-label-ex-custom">
            <Flex alignItems="center">
              <Text>Lifetime</Text>
              <IconButton
                size="sm"
                icon="info-circle"
                iconColor="gray"
                accessibilityLabel="info"
                tooltip={{
                  text: 'Sets a cap for the amount your campaign can spend over the course of its lifetime',
                }}
              />
            </Flex>
          </Label>
        </Flex>
      </RadioGroup>
    </Box>
  );
}
