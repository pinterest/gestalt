// @flow strict
import { type Node } from 'react';
import { DefaultLabelProvider } from 'gestalt';

type Props = { children: Node };

export default function DocsDefaultLabelProvider({ children }: Props): Node {
  return <DefaultLabelProvider labels={null}>{children}</DefaultLabelProvider>;
}
