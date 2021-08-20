import { Box as GestaltBox } from 'gestalt';

export default function TestElement() {
  return <GestaltBox dangerouslySetInlineStyle={{ __style: { backgroundColor: 'white' } }} />;
}
