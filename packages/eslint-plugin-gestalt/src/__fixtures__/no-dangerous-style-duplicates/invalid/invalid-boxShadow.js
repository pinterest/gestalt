import { Box } from 'gestalt';

export default function TestElement() {
  return <Box dangerouslySetInlineStyle={{ __style: { boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)' } }} />;
}
