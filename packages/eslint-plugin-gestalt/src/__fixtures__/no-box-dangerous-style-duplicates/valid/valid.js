import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box rounding={2} dangerouslySetInlineStyle={{ __style: { borderRadius: '8px 8px 0 0' } }} />
  );
}
