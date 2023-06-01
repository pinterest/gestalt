// @flow strict
import { type Node } from 'react';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import VisuallyHidden from './VisuallyHidden.js';

export default function NewTabAccessibilityLabel({
  target,
}: {|
  target?: null | 'self' | 'blank',
|}): Node {
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');
  return target === 'blank' ? (
    <VisuallyHidden>{`; ${accessibilityNewTabLabel}`}</VisuallyHidden>
  ) : null;
}
