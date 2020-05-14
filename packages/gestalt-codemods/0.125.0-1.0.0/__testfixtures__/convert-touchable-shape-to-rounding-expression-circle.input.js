// @flow strict
import React from 'react';
import { Touchable } from 'gestalt';

export default function Circle() {
  return (
    // Disabling the eslint rule because yes it's wrong to write code like this but it's in the codebase already
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <Touchable shape={'circle'}>
      circle
    </Touchable>
  );
}
