import { useState } from 'react';
import { Box, ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" direction="column" height="100%" justifyContent="center" width="100%">
      <ButtonToggle
        color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
        onClick={() => setSelected((value) => !value)}
        selected={selected}
        size="lg"
      />
      <Text size="200" weight="bold">
        {`color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}`}
      </Text>
      <Box padding={4} />
      <ButtonToggle
        color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
        disabled
        onClick={() => setSelected((value) => !value)}
        selected={false}
        size="lg"
      />
      <Text size="200" weight="bold">
        {`color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']} disabled`}
      </Text>
    </Flex>
  );
}
