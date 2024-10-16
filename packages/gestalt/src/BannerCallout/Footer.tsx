import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
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
};

export default function Footer({
  secondaryAction,
  primaryAction,
  type,
  checkWrapped = false,
  marginTop,
  buttonSize,
}: Props) {
  const [isWrapped, setIsWrapped] = useState(false);
  const wrappedRef = useRef<null | HTMLDivElement>(null);

  const checkWrappedButton = useCallback(() => {
    if (wrappedRef.current && !isWrapped && wrappedRef.current.offsetTop > 0) {
      setIsWrapped(true);
    } else if (wrappedRef.current && isWrapped && !(wrappedRef.current.offsetTop > 0)) {
      setIsWrapped(false);
    }
  }, [isWrapped]);

  useEffect(() => {
    if (checkWrapped) {
      checkWrappedButton();

      if (typeof window !== 'undefined') window.addEventListener('resize', checkWrappedButton);
    }

    return () => {
      if (checkWrapped && typeof window !== 'undefined')
        window?.removeEventListener('resize', checkWrappedButton);
    };
  }, [checkWrappedButton, checkWrapped]);

  return (
    <Box marginTop={marginTop} position="relative">
      <Flex gap={2} height="100%" justifyContent="end" wrap>
        {secondaryAction && (
          <Flex.Item flex={isWrapped && checkWrapped ? 'grow' : undefined}>
            <Action data={secondaryAction} level="secondary" size={buttonSize} type={type} />
          </Flex.Item>
        )}
        {primaryAction && (
          <Flex.Item flex={isWrapped && checkWrapped ? 'grow' : undefined}>
            <Box ref={wrappedRef} width="100%">
              <Action data={primaryAction} level="primary" size={buttonSize} type={type} />
            </Box>
          </Flex.Item>
        )}
      </Flex>
    </Box>
  );
}
