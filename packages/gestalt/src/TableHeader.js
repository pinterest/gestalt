// @flow strict
import * as React from 'react';

type Props = {|
  children: React.Node,
|};

export default function TableHeader(props: Props) {
  return <thead>{props.children}</thead>;
}
