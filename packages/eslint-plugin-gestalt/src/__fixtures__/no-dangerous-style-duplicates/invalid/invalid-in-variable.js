import { Box } from 'gestalt';

const invalidStyle = { __style: { backgroundColor: 'white' } };

export default function TestElement() {
  return <Box dangerouslySetInlineStyle={invalidStyle} />;
}
