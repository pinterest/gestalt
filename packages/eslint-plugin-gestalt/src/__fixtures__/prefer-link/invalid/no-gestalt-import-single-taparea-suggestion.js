import { TapArea } from 'gestalt';
export default function TestElement() {
  const noop = () => {}
  return (
    <TapArea href="text" role="link">Text</TapArea>
  );
}
