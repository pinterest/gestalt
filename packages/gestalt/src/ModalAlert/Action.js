// @flow strict
import { type Node } from 'react';
import Button from '../Button/Button.js';
import ButtonLink from '../ButtonLink.js';

export type ActionDataType = {|
  accessibilityLabel: string,
  disabled?: boolean,
  href?: string,
  label: string,
  onClick?:
    | $ElementType<React$ElementConfig<typeof Button>, 'onClick'>
    | $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

type Props = {| ...ActionDataType, dataTestId?: string, type: string |};

export default function ModalAlertAction({
  accessibilityLabel,
  dataTestId,
  disabled,
  label,
  onClick,
  href,
  rel,
  target,
  type,
}: Props): Node {
  const color = type === 'primary' ? 'red' : 'gray';

  return href ? (
    <ButtonLink
      accessibilityLabel={accessibilityLabel}
      color={color}
      dataTestId={dataTestId}
      disabled={disabled}
      href={href}
      fullWidth
      onClick={onClick}
      iconEnd="visit"
      rel={rel}
      size="lg"
      target={target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      dataTestId={dataTestId}
      disabled={disabled}
      color={color}
      onClick={onClick}
      fullWidth
      role="button"
      size="lg"
      text={label}
    />
  );
}
