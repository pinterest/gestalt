import { Link } from 'gestalt';
export default function TestElement() {
  return (
      <Link href='text' accessibilityLabel={() => "test"} accessibilitySelected={() => "test"} onBlur={({ event }) => {}} onClick={({ event }) => console.log(event)} onFocus={() => {}} onKeyPress={({ event }) => console.log(event)} rel="nofollow" target="blank">Text</Link>
  );
}
