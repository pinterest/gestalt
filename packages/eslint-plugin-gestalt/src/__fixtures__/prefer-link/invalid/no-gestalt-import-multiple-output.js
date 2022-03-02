import { Link } from 'gestalt';
export default function TestElement() {
  const noop = () => {}
  return (
    <Link href="text" accessibilityLabel={noop} accessibilitySelected={noop} onBlur={({ event }) => {}} onClick={({ event }) => noop(event)} onFocus={() => {}} onKeyPress={({ event }) => noop(event)} rel="nofollow" target="blank">Text</Link>
  );
}
