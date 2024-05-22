import { useState } from 'react';
import { Button, ButtonGroup, ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  const [filterPuppies, setFilterPuppies] = useState(true);
  const [filterKittens, setFilterKittens] = useState(true);
  const [filter, setFilter] = useState(false);

  return (
    <Flex
      alignContent="center"
      direction="column"
      gap={2}
      height="100%"
      justifyContent="center"
      width="50%"
    >
      <ButtonGroup>
        <ButtonToggle
          onClick={() => {
            setFilterPuppies(!filterPuppies);
            setFilter(false);
          }}
          selected={filterPuppies}
          size="lg"
          text="Puppies"
        />
        <ButtonToggle
          onClick={() => {
            setFilterKittens(!filterKittens);
            setFilter(false);
          }}
          selected={filterKittens}
          size="lg"
          text="Kittens"
        />
        <Button
          color="red"
          onClick={() => {
            setFilter(true);
          }}
          size="lg"
          text="Filter"
        />
      </ButtonGroup>
      <Text align="center" color="default">
        {filter ? 'Filter Applied!' : ''}
      </Text>
    </Flex>
  );
}
