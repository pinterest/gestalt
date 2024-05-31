import { useState } from 'react';
import { Box, ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [saved, setSaved] = useState(false);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          color="red"
          onClick={() => setSaved(!saved)}
          selected={saved}
          size="lg"
          text={saved ? 'Saved' : 'Save'}
        />
      </ButtonGroup>
    </Flex>
  );
}
