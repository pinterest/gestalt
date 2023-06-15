// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text, useFocusVisible } from 'gestalt';

export default function Example(): Node {
  const { isFocusVisible } = useFocusVisible();
  const [focusedButton1, setFocusedButton1] = useState(false);
  const [focusedButton2, setFocusedButton2] = useState(false);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={12}>
        <Flex direction="column" alignItems="center" gap={4}>
          <Text>Using useFocusVisible(): Focus ring is only visible when using keyboard</Text>
          <button
            onBlur={() => setFocusedButton1(false)}
            onFocus={() => setFocusedButton1(true)}
            style={{
              outline: 'none',
              boxShadow:
                isFocusVisible && focusedButton1 ? '0 0 0 4px rgba(0, 132, 255, 0.5)' : null,
            }}
            type="button"
          >
            <Text>Button 1</Text>
          </button>
        </Flex>

        <Flex alignItems="center" direction="column" gap={4}>
          <Text>Not using useFocusVisible(): Focus ring is always visible</Text>
          <button
            onBlur={() => setFocusedButton2(false)}
            onFocus={() => setFocusedButton2(true)}
            style={{
              outline: 'none',
              boxShadow: focusedButton2 ? '0 0 0 4px rgba(0, 132, 255, 0.5)' : null,
            }}
            type="button"
          >
            <Text>Button 2</Text>
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
