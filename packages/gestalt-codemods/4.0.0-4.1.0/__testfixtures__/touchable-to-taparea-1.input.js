// @flow strict
import React from 'react';
import { Touchable } from 'gestalt';

export default function TestTouchable() {
  return <Touchable onTouch={() => {}}>Hello</Touchable>;
}
