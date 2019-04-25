// @flow

import * as React from 'react';
import Box from './Box.js';
import ListItem from './ListItem.js';

type Props = {|
  items: Array<{|
    onClick: ({
      event:
        | SyntheticMouseEvent<HTMLDivElement>
        | SyntheticKeyboardEvent<HTMLDivElement>,
    }) => void,
    children: React.Node,
  |}>,
|};

export default function List({ items }: Props) {
  return (
    <Box column={12} paddingY={4} role="list">
      {items.map((item, index) => (
        <ListItem key={index} onClick={item.onClick}>
          {item.children}
        </ListItem>
      ))}
    </Box>
  );
}
