// @flow strict
import { type ElementConfig, type Node } from 'react';
import Button from '../Button.js';
import ButtonLink from '../ButtonLink.js';
import Link from '../Link.js';

type Props =
  | {
      accessibilityLabel: string,
      href: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
      role: 'link',
      size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
      target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
    }
  | {
      accessibilityLabel: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
      role: 'button',
      size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    };

export default function PrimaryAction({
  accessibilityLabel,
  label,
  size = 'lg',
  ...props
}: Props): Node {
  if (props.role === 'link')
    return (
      <ButtonLink
        accessibilityLabel={accessibilityLabel}
        color="red"
        href={props.href || ''}
        onClick={props.onClick}
        rel={props.rel}
        size={size}
        target={props.target}
        text={label}
      />
    );

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="red"
      onClick={props.onClick}
      size={size}
      text={label}
    />
  );
}
