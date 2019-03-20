// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';

const noop = () => {};

type Props = {|
  anchor: ?HTMLElement,
  id?: string,
  text: string,
|};

export default function Tooltip({ anchor, id, text }: Props) {
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
      <Box maxWidth={180} paddingY={1} paddingX={2} id={id}>
        <Text color="white" size="xs">
          {text}
        </Text>
      </Box>
    </Controller>
  );
}
