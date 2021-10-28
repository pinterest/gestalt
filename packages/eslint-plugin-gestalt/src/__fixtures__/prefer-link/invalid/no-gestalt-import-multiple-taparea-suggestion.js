import { TapArea } from 'gestalt';
export default function TestElement() {
  const noop = () => {}
  return (
    <TapArea href="text" accessibilityLabel={noop} onBlur={({ event }) => {}} onTap={({ event }) => noop(event)} onFocus={() => {}} rel="nofollow" role="link" target="blank">Text</TapArea>
  );
}
