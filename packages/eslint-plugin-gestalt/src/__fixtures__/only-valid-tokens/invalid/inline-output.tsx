// @ts-nocheck
import { TOKEN_COLOR_BORDER_ERROR } from 'gestalt-design-tokens';
import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box>
      <div
        className="appContent"
        role="main"
        style={{
          backgroundColor: `${TOKEN_COLOR_BORDER_ERROR}` + 'var(--color-border-error)',
        }}
      />
    </Box>
  );
}
