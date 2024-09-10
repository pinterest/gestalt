import { useState } from 'react';
import { Box, ButtonGroup, ButtonToggle, Flex, Text } from 'gestalt';

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
      <ButtonToggle
        color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
        onClick={() => setSelected((value) => !value)}
        selected={selected}
        size="lg"
        text="Fair Skin"
      />
      <Text size="200" weight="bold">
        {`color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}`}
      </Text>
      <Box padding={4} />
      <ButtonGroup>
        <ButtonToggle
          color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
          disabled
          onClick={() => setSelected((value) => !value)}
          selected={false}
          size="lg"
          text="Fair Skin"
        />
        <ButtonToggle
          color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
          disabled
          onClick={() => setSelected((value) => !value)}
          selected
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
      <Text size="200" weight="bold">
        {`color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']} disabled`}
      </Text>
    </Flex>
  );
}
