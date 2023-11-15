// @flow strict
import { type Node as ReactNode } from 'react';
import VisuallyHidden from './VisuallyHidden.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';

export default function NewTabAccessibilityLabel({
  target,
}: {
  target?: null | 'self' | 'blank',
}): ReactNode {
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');
  return target === 'blank' ? (
    <VisuallyHidden>{`; ${accessibilityNewTabLabel}`}</VisuallyHidden>
  ) : null;
}
