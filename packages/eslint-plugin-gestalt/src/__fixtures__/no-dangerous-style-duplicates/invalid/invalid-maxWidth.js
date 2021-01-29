import { Box } from 'gestalt';

export default function TestElement() {
  return <Box dangerouslySetInlineStyle={{ __style: { maxWidth: '8px' } }} />;
}
