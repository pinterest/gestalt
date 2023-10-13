// @flow strict
import { type ElementConfig, type Node } from 'react';
import Button from '../Button.js';
import ButtonLink from '../ButtonLink.js';

type Props =
  | {
      accessibilityLabel: string,
      href: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: $ElementType<ElementConfig<typeof ButtonLink>, 'rel'>,
      role: 'link',
      size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
      target?: $ElementType<ElementConfig<typeof ButtonLink>, 'target'>,
    }
  | {
      accessibilityLabel: string,
      label: string,
      onClick: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
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
        color="white"
        href={props.href ?? ''}
        onClick={props.onClick}
        rel={props.rel}
        target={props.target}
        text={label}
        size={size}
      />
    );

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      onClick={props.onClick}
      size={size}
      text={label}
    />
  );
}
