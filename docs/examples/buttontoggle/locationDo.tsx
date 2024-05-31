import { useState } from 'react';
import { Button, ButtonGroup, ButtonToggle, Flex, Toast } from 'gestalt';

export default function Example() {
  const [filterPuppies, setFilterPuppies] = useState(true);
  const [filterKittens, setFilterKittens] = useState(true);
  const [filter, setFilter] = useState(false);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
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
      {filter && (
        <Toast
          dismissButton={{
            accessibilityLabel: `Filter Applied!`,
            onDismiss: () => setFilter(false),
          }}
          text="Filter Applied!"
        />
      )}
    </Flex>
  );
}
