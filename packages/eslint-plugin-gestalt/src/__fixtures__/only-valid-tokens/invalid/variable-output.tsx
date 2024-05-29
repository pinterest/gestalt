// @ts-nocheck
import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens';
import { Box } from 'gestalt';

export default function TestElement() {
  const colorToken = `${TOKEN_COLOR_WHITE_MOCHIMALIST_0}` + 'var(--color-white-mochimalist-0)';

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: colorToken,
        },
      }}
    />
  );
}
