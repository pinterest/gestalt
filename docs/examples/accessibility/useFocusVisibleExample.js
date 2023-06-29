// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, useFocusVisible } from 'gestalt';

export default function UseFocusVisibleExample(): Node {
  const { isFocusVisible } = useFocusVisible();
  const [focusedButton1, setFocusedButton1] = useState(false);
  const [focusedButton2, setFocusedButton2] = useState(false);

  return (
    <Box padding={4} height="100%">
      <Flex
        alignItems="center"
        direction="column"
        gap={{
          row: 0,
          column: 12,
        }}
      >
        <Flex
          direction="column"
          alignItems="center"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Text>Using useFocusVisible(): Focus ring is only visible when using keyboard</Text>
          <button
            type="button"
            onBlur={() => setFocusedButton1(false)}
            onFocus={() => setFocusedButton1(true)}
            style={{
              outline: 'none',
              boxShadow:
                isFocusVisible && focusedButton1 ? '0 0 0 4px rgba(0, 132, 255, 0.5)' : null,
            }}
          >
            <Text color="dark">Button 1</Text>
          </button>
        </Flex>
        <Flex
          alignItems="center"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Text>Not using useFocusVisible(): Focus ring is always visible</Text>
          <button
            type="button"
            onBlur={() => setFocusedButton2(false)}
            onFocus={() => setFocusedButton2(true)}
            style={{
              outline: 'none',
              boxShadow: focusedButton2 ? '0 0 0 4px rgba(0, 132, 255, 0.5)' : null,
            }}
          >
            <Text color="dark">Button 2</Text>
          </button>
        </Flex>
      </Flex>
    </Box>
  );
}
