// @flow strict
import { Provider } from 'gestalt';

export default function TestGestaltProvider() {
  return <Provider onTouch={() => {}}>Hello</Provider>;
}
