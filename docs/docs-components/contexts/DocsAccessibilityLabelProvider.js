// @flow strict
import { type Node } from 'react';
import { AccessibilityLabelProvider } from 'gestalt';

type Props = {| children: Node |};

export default function DocsAccessibilityLabelProvider({ children }: Props): Node {
  return <AccessibilityLabelProvider value={null}>{children}</AccessibilityLabelProvider>;
}
