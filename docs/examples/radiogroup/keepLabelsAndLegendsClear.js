// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, IconButton, Label, RadioGroup, Text } from 'gestalt';

export default function RadioButtonExample(): ReactNode {
  const [favorite, setFavorite] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="bestPracticeBudget" legend="Campaign budget">
        <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="start">
          <RadioGroup.RadioButton
            checked={favorite === 'daily'}
            id="daily"
            name="budget"
            onChange={() => setFavorite('daily')}
            value="daily"
          />
          <Label htmlFor="daily">
            <Flex alignItems="center">
              <Text>Daily</Text>
              <IconButton
                accessibilityLabel="info"
                icon="info-circle"
                iconColor="gray"
                size="sm"
                tooltip={{ text: 'Sets a cap for the amount your campaign can spend each day' }}
              />
            </Flex>
          </Label>
        </Flex>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="start">
          <RadioGroup.RadioButton
            checked={favorite === 'lifetime'}
            id="lifetime"
            name="budget"
            onChange={() => setFavorite('lifetime')}
            value="lifetime"
          />
          <Label htmlFor="lifetime">
            <Flex alignItems="center">
              <Text>Lifetime</Text>
              <IconButton
                accessibilityLabel="info"
                icon="info-circle"
                iconColor="gray"
                size="sm"
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
