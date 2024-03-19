import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box>
      <div
        className="appContent"
        role="main"
        style={{
          backgroundColor: 'var(--color-border-error)',
        }}
      />
    </Box>
  );
}
