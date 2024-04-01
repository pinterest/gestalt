import { Box } from 'gestalt';

export default function TestElement() {
  const colorToken = 'var(--color-grayscale-0)';

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
