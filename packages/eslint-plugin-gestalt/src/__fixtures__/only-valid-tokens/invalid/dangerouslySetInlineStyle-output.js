import { TOKEN_COLOR_BORDER_CONTAINER } from 'gestalt-design-tokens';
import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: `${TOKEN_COLOR_BORDER_CONTAINER}` + 'var(--color-border-container)',
        },
      }}
    />
  );
}
