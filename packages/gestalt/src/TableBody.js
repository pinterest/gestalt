// @flow strict
import React, { type Node } from 'react';

type Props = {|
  children: Node,
|};

export default function TableBody(props: Props): Node {
  return <tbody>{props.children}</tbody>;
}
