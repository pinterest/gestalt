// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, Flex, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): ReactNode {
  const [favorite, setFavorite] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <RadioGroup id="bestPracticeFeedsDo" legend="Feed preference">
          <RadioGroup.RadioButton
            checked={favorite === 'grid'}
            id="grid-do"
            label="Grid"
            name="feed-do"
            onChange={() => setFavorite('grid')}
            value="grid"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'list'}
            id="list-do"
            label="List"
            name="feed-do"
            onChange={() => setFavorite('list')}
            value="list"
          />
        </RadioGroup>
        <Button color="red" text="Submit" />
      </Flex>
    </Box>
  );
}
