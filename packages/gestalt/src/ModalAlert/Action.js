// @flow strict
import { type Node } from 'react';
import Button from '../Button.js';
import ButtonLink from '../ButtonLink.js';

type LinkDataType = {|
  role: 'link',
  accessibilityLabel: string,
  disabled?: boolean,
  href?: string,
  label: string,
  onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};
type ButtonDataType = {|
  role: 'button',
  accessibilityLabel: string,
  disabled?: boolean,
  label: string,
  onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
|};

type Props = {| ...LinkDataType | ButtonDataType, dataTestId?: string, type: string |};

export default function ModalAlertAction({ dataTestId, type, ...props }: Props): Node {
  const color = type === 'primary' ? 'red' : 'gray';

  return props.role === 'link' ? (
    <ButtonLink
      accessibilityLabel={props.accessibilityLabel}
      color={color}
      dataTestId={dataTestId}
      disabled={props.disabled}
      href={props.href || ''}
      fullWidth
      onClick={props.onClick}
      iconEnd="visit"
      rel={props.rel}
      size="lg"
      target={props.target}
      text={props.label}
    />
  ) : (
    <Button
      accessibilityLabel={props.accessibilityLabel}
      dataTestId={dataTestId}
      disabled={props.disabled}
      color={color}
      onClick={props.onClick}
      fullWidth
      size="lg"
      text={props.label}
    />
  );
}
