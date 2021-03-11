// @flow strict
import { GestaltProvider as RenamedGestaltProvider } from 'gestalt';

export default function TestGestaltProvider() {
  return <RenamedGestaltProvider onTouch={() => {}}>Hello</RenamedGestaltProvider>;
}
