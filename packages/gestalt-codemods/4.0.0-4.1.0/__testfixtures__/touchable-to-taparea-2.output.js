// @flow strict
import React from 'react';
import { TapArea } from 'gestalt';

export default function TestTouchable() {
  return <TapArea onTap={() => {}}>Hello</TapArea>;
}
