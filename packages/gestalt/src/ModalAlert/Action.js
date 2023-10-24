// @flow strict
import { type Node } from 'react';
import Button from '../Button.js';
import ButtonLink from '../ButtonLink.js';

type LinkDataType = {
  accessibilityLabel: string,
  dataTestId?: string,
  disabled?: boolean,
  href: string,
  label: string,
  onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
  type: string,
};
type ButtonDataType = {
  accessibilityLabel: string,
  dataTestId?: string,
  disabled?: boolean,
  label: string,
  onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
  role?: 'button',
  type: string,
};

type Props = LinkDataType | ButtonDataType;

export default function ModalAlertAction({
  dataTestId,
  type,
  accessibilityLabel,
  disabled,
  label,
  ...props
}: Props): Node {
  const color = type === 'primary' ? 'red' : 'gray';

  return props.role === 'link' ? (
    <ButtonLink
      accessibilityLabel={accessibilityLabel}
      color={color}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth
      href={props.href || ''}
      iconEnd="visit"
      onClick={props.onClick}
      rel={props.rel}
      size="lg"
      target={props.target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      color={color}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth
      onClick={props.onClick}
      size="lg"
      text={label}
    />
  );
}
