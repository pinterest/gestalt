// @flow strict
import { type Node as ReactNode } from 'react';
import { DefaultLabelProvider } from 'gestalt';

type Props = { children: ReactNode };

export default function DocsDefaultLabelProvider({ children }: Props): ReactNode {
  return <DefaultLabelProvider labels={null}>{children}</DefaultLabelProvider>;
}
