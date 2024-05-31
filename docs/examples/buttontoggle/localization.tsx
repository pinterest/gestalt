import { useState } from 'react';
import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <ButtonToggle
        iconStart="sparkle"
        onClick={() => setSelected((value) => !value)}
        selected={selected}
        size="lg"
        text={selected ? 'Gefolgt' : 'Folgen'}
      />
    </Flex>
  );
}
