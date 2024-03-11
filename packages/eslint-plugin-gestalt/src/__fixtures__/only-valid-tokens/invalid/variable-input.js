import { Box } from 'gestalt';

export default function TestElement() {
  const colorToken = 'var(--color-white-mochimalist-0)';

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
