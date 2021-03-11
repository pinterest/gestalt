// @flow strict
import { Touchable as RenamedTouchable } from 'gestalt';

export default function TestTouchable() {
  return <RenamedTouchable onTouch={() => {}}>Hello</RenamedTouchable>;
}
