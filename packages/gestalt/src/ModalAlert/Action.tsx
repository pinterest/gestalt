import { type ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';

type LinkDataType = {
  accessibilityLabel: string;
  dataTestId?: string;
  disabled?: boolean;
  href: string;
  label: string;
  onClick?: ComponentProps<typeof ButtonLink>['onClick'];
  rel?: 'none' | 'nofollow';
  role: 'link';
  target?: null | 'self' | 'blank';
  type: string;
};
type ButtonDataType = {
  accessibilityLabel: string;
  dataTestId?: string;
  disabled?: boolean;
  label: string;
  onClick?: ComponentProps<typeof Button>['onClick'];
  role?: 'button';
  type: string;
};

type Props = LinkDataType | ButtonDataType;

export default function ModalAlertAction({
  dataTestId,
  type,
  accessibilityLabel,
  disabled,
  label,
  ...props
}: Props) {
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
