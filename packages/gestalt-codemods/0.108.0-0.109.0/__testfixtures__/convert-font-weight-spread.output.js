// @flow strict
import React from 'react';
import { Text } from 'gestalt';

export default function BoldText() {
  return (
    <Text {...textProps} truncate weight="bold">
      Bold
    </Text>
  );
}
