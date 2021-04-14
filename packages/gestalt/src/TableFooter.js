// @flow strict
import type { Node } from 'react';

type Props = {|
  children: Node,
|};

export default function TableFooter(props: Props): Node {
  return <tfoot>{props.children}</tfoot>;
}
