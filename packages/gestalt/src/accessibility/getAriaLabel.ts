export default function getAriaLabel({
  accessibilityLabel,
  accessibilityNewTabLabel,
  target,
}: {
  accessibilityLabel?: string;
  accessibilityNewTabLabel: string;
  target?: null | 'self' | 'blank';
}): string | undefined {
  let ariaLabel = accessibilityLabel ?? undefined;
  if (ariaLabel && target === 'blank') {
    ariaLabel = `${ariaLabel}; ${accessibilityNewTabLabel}`;
  }
  return ariaLabel;
}
