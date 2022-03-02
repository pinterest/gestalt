import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box bottom top dangerouslySetInlineStyle={{ __style: { transform: 'translate(-50%, -50%)', backgroundColor: 'white', 'z-index': 1 } }} />
  );
}
