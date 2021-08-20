import { Box } from 'gestalt';

export default function TestElement() {
  return <Box top dangerouslySetInlineStyle={{ __style: { 'z-index': 1, backgroundColor: 'white' } }} />;
}
