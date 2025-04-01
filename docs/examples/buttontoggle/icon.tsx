import { useState } from 'react';
import { Box,ButtonToggle, Flex } from 'gestalt';

export default function Example() {
    const [selected, setSelected] = useState(false);
  
  return (
    <Flex
    alignItems="center"
    direction="column"
    gap={2}
    height="100%"
    justifyContent="center"
    width="100%"
  >
      <ButtonToggle iconStart="sparkle" selected={false} size="lg" text="Follow" />
      <Box padding={4} />
        <ButtonToggle
          color='primary'
          iconStart={selected ? 'check' : undefined}
          onClick={() => setSelected((value) => !value)}
          selected={selected}
          size="lg"
          text={selected ? 'Selected' : 'Select'}
        />
    </Flex>
  );
}
