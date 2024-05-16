import { ReactNode, useState } from 'react';
import { Flex, Text, useFocusVisible } from 'gestalt';
import { TOKEN_COLOR_BORDER_FOCUS } from 'gestalt-design-tokens';

export default function Example() {
  const { isFocusVisible } = useFocusVisible();
  const [focusedButton1, setFocusedButton1] = useState(false);
  const [focusedButton2, setFocusedButton2] = useState(false);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={12}>
        <Flex alignItems="center" direction="column" gap={4}>
          <Text>Using useFocusVisible(): Focus ring is only visible when using keyboard</Text>
          <button
            onBlur={() => setFocusedButton1(false)}
            onFocus={() => setFocusedButton1(true)}
            style={{
              outline: 'none',
// @ts-expect-error - TS2322 - Type '"0 0 0 4px var(--color-border-focus)" | null' is not assignable to type 'BoxShadow | undefined'.
              boxShadow:
                isFocusVisible && focusedButton1 ? `0 0 0 4px ${TOKEN_COLOR_BORDER_FOCUS}` : null,
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
// @ts-expect-error - TS2322 - Type '"0 0 0 4px var(--color-border-focus)" | null' is not assignable to type 'BoxShadow | undefined'.
              boxShadow: focusedButton2 ? `0 0 0 4px ${TOKEN_COLOR_BORDER_FOCUS}` : null,
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
