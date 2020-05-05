// @flow strict
import React from 'react';
import { Touchable } from 'gestalt';

export default function Circle() {
  return (
    <Touchable rounding="circle">
      circle
    </Touchable>
  );
}
