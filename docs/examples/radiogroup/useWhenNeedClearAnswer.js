// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Flex, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [favorite, setFavorite] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column">
        <RadioGroup legend="Feed preference" id="bestPracticeFeedsDo">
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
