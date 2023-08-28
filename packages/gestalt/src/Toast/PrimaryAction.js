// @flow strict
import { type ElementConfig, type Node } from 'react';
import Button from '../Button.js';
import Link from '../Link.js';

type Props = {|
  accessibilityLabel: string,
  href?: string,
  label: string,
  onClick?: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
  rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
  size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
  target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
|};

export default function PrimaryAction({
  accessibilityLabel,
  href,
  label,
  onClick,
  rel,
  size = 'lg',
  target,
}: Props): Node {
  if (href)
    return (
      <Button
        accessibilityLabel={accessibilityLabel}
        href={href}
        rel={rel}
        target={target}
        role="link"
        text={label}
        size={size}
        onClick={onClick}
        color="white"
      />
    );

  return (
    <Button accessibilityLabel={accessibilityLabel} text={label} size={size} onClick={onClick} />
  );
}
