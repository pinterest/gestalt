// @flow strict
import React from 'react';
import { GestaltProvider } from 'gestalt';

export default function TestGestaltProvider() {
  return <GestaltProvider onTouch={() => {}}>Hello</GestaltProvider>;
}
