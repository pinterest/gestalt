// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';

const noop = () => {};

type Props = {|
  anchor: ?HTMLElement,
  text: string,
|};

export default function Tooltip({ anchor, text }: Props) {
  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor="darkGray"
      caret={false}
      idealDirection="down"
      onDismiss={noop}
      positionRelativeToAnchor
      size={null}
    >
      <Box padding={2}>
        <Text color="white" size="xs">
          {text}
        </Text>
      </Box>
    </Controller>
  );
}
