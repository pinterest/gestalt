import { type ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import type Link from '../Link';

type Props =
  | {
      accessibilityLabel: string;
      href: string;
      label: string;
      onClick?: ComponentProps<typeof ButtonLink>['onClick'];
      rel?: ComponentProps<typeof Link>['rel'];
      role: 'link';
      size?: ComponentProps<typeof ButtonLink>['size'];
      target?: ComponentProps<typeof Link>['target'];
    }
  | {
      accessibilityLabel: string;
      label: string;
      onClick?: ComponentProps<typeof Button>['onClick'];
      role: 'button';
      size?: ComponentProps<typeof Button>['size'];
    };

export default function PrimaryAction({ accessibilityLabel, label, size = 'lg', ...props }: Props) {
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
