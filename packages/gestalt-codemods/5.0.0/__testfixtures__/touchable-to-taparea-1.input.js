// @flow strict
import { Touchable } from 'gestalt';

export default function TestTouchable() {
  return <Touchable onTouch={() => {}}>Hello</Touchable>;
}
