// @flow strict
import React from 'react';
import { Touchable } from 'gestalt';

export default function Rounded() {
  return (
    <Touchable rounding={2}>
      rounded
    </Touchable>
  );
}
