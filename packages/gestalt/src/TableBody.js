// @flow strict
import * as React from 'react';

type Props = {|
  children: React.Node,
|};

export default function TableBody(props: Props): React.Node {
  return <tbody>{props.children}</tbody>;
}
