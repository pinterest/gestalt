import { useState } from 'react';
import { ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonToggle
        color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
        onClick={(value) => setSelected(!value)}
        selected={selected}
        size="lg"
      />
    </Flex>
  );
}
