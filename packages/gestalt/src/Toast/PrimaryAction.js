// @flow strict
import { type ElementConfig, type Node } from 'react';
import Button from '../Button.js';
import ButtonLink from '../ButtonLink.js';

type Props =
  | {|
      role: 'link',
      accessibilityLabel: string,
      href?: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: $ElementType<ElementConfig<typeof ButtonLink>, 'rel'>,
      size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
      target?: $ElementType<ElementConfig<typeof ButtonLink>, 'target'>,
    |}
  | {|
      role: 'button',
      accessibilityLabel: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
      size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    |};

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
        href={props.href ?? ''}
        rel={props.rel}
        target={props.target}
        text={label}
        size={size}
        onClick={props.onClick}
        color="white"
      />
    );

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      text={label}
      size={size}
      onClick={props.onClick}
    />
  );
}
