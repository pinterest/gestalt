// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandable from './ModuleExpandable.js';

type Props = {|
  id: string,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  items: $ReadOnlyArray<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    summary?: $ReadOnlyArray<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
|};
export default function Module({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  items,
}: Props): Node {
  return (
    <Box rounding={2} borderStyle="shadow">
      {items.map(
        (
          { icon, iconAccessibilityLabel, title, type, summary, children },
          index
        ) => (
          <React.Fragment key={index}>
            <Box>Hi</Box>
            {index !== items.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
