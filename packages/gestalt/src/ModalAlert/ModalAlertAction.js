// @flow strict
import { type Node } from 'react';
import Button from '../Button.js';
import { type ActionDataType } from '../ModalAlert.js';

type Props = {| ...ActionDataType, type: string |};

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
    <Button
      accessibilityLabel={accessibilityLabel}
      color={color}
      dataTestId={dataTestId}
      disabled={disabled}
      href={href}
      fullWidth
      onClick={onClick}
      iconEnd="visit"
      rel={rel}
      role="link"
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
