// @flow strict
import * as React from 'react';

type Props = {|
  children: React.Node,
|};

export default function TableRow(props: Props): React.Node {
  return <tr>{props.children}</tr>;
}
