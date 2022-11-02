// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

export default function NewTabAccessibilityLabel({
  target,
}: {|
  target?: null | 'self' | 'blank',
|}): Node {
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');
  return target === 'blank' ? (
    <Box display="visuallyHidden">{`; ${accessibilityNewTabLabel}`}</Box>
  ) : null;
}

export function getAriaLabel({
  accessibilityLabel,
  accessibilityNewTabLabel,
  target,
}: {|
  accessibilityLabel?: string,
  accessibilityNewTabLabel: string,
  target?: null | 'self' | 'blank',
|}): string | void {
  let ariaLabel = accessibilityLabel ?? undefined;
  if (ariaLabel && target === 'blank') {
    ariaLabel = `${ariaLabel}; ${accessibilityNewTabLabel}`;
  }
  return ariaLabel;
}
