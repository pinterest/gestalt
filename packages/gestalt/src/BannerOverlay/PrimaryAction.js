// @flow strict
import { type ElementConfig, type Node as ReactNode } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';

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
}: Props): ReactNode {
  if (props.role === 'link')
    return (
      <ButtonLink
        accessibilityLabel={accessibilityLabel}
        color="red"
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
      color="red"
      accessibilityLabel={accessibilityLabel}
      onClick={props.onClick}
      size={size}
      text={label}
    />
  );
}
