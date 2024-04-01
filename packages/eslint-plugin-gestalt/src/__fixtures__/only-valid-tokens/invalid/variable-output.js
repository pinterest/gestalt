import { TOKEN_COLOR_GRAYSCALE_0 } from 'gestalt-design-tokens';
import { Box } from 'gestalt';

export default function TestElement() {
  const colorToken = `${TOKEN_COLOR_GRAYSCALE_0}` + 'var(--color-grayscale-0)';

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
