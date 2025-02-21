import { ComponentProps, useRef } from 'react';
import useIsWrappedContainer from './useIsWrappedContainer';
import Box from '../Box';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import Flex from '../Flex';

type ActionDataType =
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      href: string;
      label: string;
      onClick?: ComponentProps<typeof ButtonLink>['onClick'];
      rel?: 'none' | 'nofollow';
      role: 'link';
      target?: null | 'self' | 'blank';
    }
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      label: string;
      onClick?: ComponentProps<typeof Button>['onClick'];
      role?: 'button';
    };

function Action({
  data,
  level,
  type,
  size = 'lg',
}: {
  data: ActionDataType;
  level: string;
  size?: 'md' | 'lg';
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
}) {
  const primaryColor: ComponentProps<typeof Button>['color'] = 'red';

  let secondaryColor: 'white' | 'transparent' | 'gray' = 'white';

  if (type === 'default') {
    secondaryColor = 'gray';
  }

  const color: ComponentProps<typeof Button>['color'] =
    level === 'primary' ? primaryColor : secondaryColor;

  const { accessibilityLabel, disabled, label } = data;

  return data.role === 'link' ? (
    <ButtonLink
      accessibilityLabel={accessibilityLabel}
      color={color}
      disabled={disabled}
      fullWidth
      href={data.href}
      onClick={data.onClick}
      rel={data.rel}
      size={size}
      target={data.target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      color={color}
      disabled={disabled}
      fullWidth
      onClick={data.onClick}
      size={size}
      text={label}
    />
  );
}

type Props = {
  primaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  secondaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  checkWrapped?: boolean;
  marginTop: 0 | 4 | 6;
  buttonSize: 'md' | 'lg';
  fullHeight?: boolean;
  wrap?: boolean;
  selfAlign?: 'center';
};

export default function Footer({
  secondaryAction,
  primaryAction,
  fullHeight,
  type,
  checkWrapped = false,
  marginTop,
  buttonSize,
  wrap = true,
  selfAlign,
}: Props) {
  const wrappedRef = useRef<null | HTMLDivElement>(null);

  const isWrapped = useIsWrappedContainer(wrappedRef, checkWrapped);

  return (
    <Box
      alignContent="center"
      display="flex"
      height={fullHeight ? undefined : '100%'}
      justifyContent="end"
      marginTop={marginTop}
      position="relative"
    >
      <Flex alignContent="center" gap={2} justifyContent="end" wrap={wrap}>
        {secondaryAction && (
          <Flex.Item alignSelf={selfAlign} flex={isWrapped && checkWrapped ? 'grow' : undefined}>
            <Action data={secondaryAction} level="secondary" size={buttonSize} type={type} />
          </Flex.Item>
        )}
        {primaryAction && (
          <Flex.Item alignSelf={selfAlign} flex={isWrapped && checkWrapped ? 'grow' : undefined}>
            <Box ref={wrappedRef} width="100%">
              <Action data={primaryAction} level="primary" size={buttonSize} type={type} />
            </Box>
          </Flex.Item>
        )}
      </Flex>
    </Box>
  );
}
