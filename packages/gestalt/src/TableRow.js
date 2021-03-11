// @flow strict
import type { Node } from 'react';

type Props = {|
  children: Node,
|};

export default function TableRow(props: Props): Node {
  return <tr>{props.children}</tr>;
}
