import {
  Children,
  ComponentProps,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import {
  SEMA_SPACE_800,
  SEMA_SPACE_1200,
} from 'gestalt-design-tokens/dist/js/vr-theme/constants.es';
import styles from '../BannerCallout.css';
import Box from '../Box';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import Icon from '../Icon';
import IconButton from '../IconButton';
import MESSAGING_TYPE_ATTRIBUTES from '../MESSAGING_TYPE_ATTRIBUTES';
import Text from '../Text';

export type ActionDataType =
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

type Props = {
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  iconAccessibilityLabel?: string;
  message: string | ReactElement;
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
  title?: string;
};

function BannerCalloutAction({
  data,
  level,
  type,
}: {
  data: ActionDataType;
  level: string;
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
}) {
  const primaryColor: ComponentProps<typeof Button>['color'] = 'white';

  let secondaryColor: 'white' | 'transparent' | 'gray' = 'transparent';

  if (type === 'default') {
    secondaryColor = 'gray';
  }

  const color: ComponentProps<typeof Button>['color'] =
    level === 'primary' ? primaryColor : secondaryColor;

  const { accessibilityLabel, disabled, label } = data;

  return (
    <Box
      alignItems="center"
      display="block"
      justifyContent="center"
      paddingX={1}
      smDisplay="flex"
      smMarginBottom="auto"
      smMarginTop="auto"
    >
      {data.role === 'link' ? (
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          fullWidth
          href={data.href}
          onClick={data.onClick}
          rel={data.rel}
          size="lg"
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
          size="lg"
          text={label}
        />
      )}
    </Box>
  );
}

function VRBannerCalloutAction({
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

export default function BannerCallout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props) {
  const {
    accessibilityDismissButtonLabel,
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('BannerCallout');
  const [isWrapped, setIsWrapped] = useState(false);
  const wrappedRef = useRef<null | HTMLDivElement>(null);

  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  const getDefaultIconAccessibilityLabel = () => {
    switch (type) {
      case 'success':
        return iconAccessibilityLabelSuccess;
      case 'info':
        return iconAccessibilityLabelInfo;
      case 'recommendation':
        return iconAccessibilityLabelRecommendation;
      case 'warning':
        return iconAccessibilityLabelWarning;
      case 'error':
        return iconAccessibilityLabelError;
      default:
        return '';
    }
  };

  const checkWrappedButton = useCallback(() => {
    if (wrappedRef.current && !isWrapped && wrappedRef.current.offsetTop > 0) {
      setIsWrapped(true);
    } else if (wrappedRef.current && isWrapped && !(wrappedRef.current.offsetTop > 0)) {
      setIsWrapped(false);
    }
  }, [isWrapped]);

  useEffect(() => {
    checkWrappedButton();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkWrappedButton);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkWrappedButton);
    };
  }, [checkWrappedButton]);


  return (
    <Box width="100%">
      {/*
            SM BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={MESSAGING_TYPE_ATTRIBUTES[type]?.backgroundColor}
        display="block"
        lgDisplay="none"
        padding={6}
        position="relative"
        rounding={4}
        smDisplay="none"
        width="100%"
      >
        <Flex direction="column" width="100%">
          <Flex.Item minWidth={0}>
            <Box marginBottom={primaryAction || secondaryAction ? 4 : undefined}>
              <Flex gap={3}>
                <Icon
                  accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
                  color={MESSAGING_TYPE_ATTRIBUTES[type]?.iconColor}
                  icon={MESSAGING_TYPE_ATTRIBUTES[type]?.icon}
                  size={24}
                />

                <Box maxWidth={648}>
                  {(title || message) && (
                    <Flex direction="column" gap={2} width="100%">
                      {title && <Heading size="400">{title}</Heading>}
                      {message && typeof message === 'string' && <Text>{message}</Text>}
                      {message &&
                      typeof message !== 'string' &&
                      // @ts-expect-error - TS2339
                      Children.only<ReactElement>(message).type.displayName === 'Text'
                        ? message
                        : null}
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Box>
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Box marginTop={4} position="relative">
              <Flex gap={2} justifyContent="end" wrap>
                {secondaryAction && (
                  <Flex.Item flex={isWrapped ? 'grow' : undefined}>
                    <VRBannerCalloutAction
                      data={secondaryAction}
                      level="secondary"
                      size="md"
                      type={type}
                    />
                  </Flex.Item>
                )}
                {primaryAction && (
                  <Flex.Item flex={isWrapped ? 'grow' : undefined}>
                    <Box ref={wrappedRef} width="100%">
                      <VRBannerCalloutAction
                        data={primaryAction}
                        level="primary"
                        size="md"
                        type={type}
                      />
                    </Box>
                  </Flex.Item>
                )}
              </Flex>
            </Box>
          )}

          {dismissButton && (
            <div className={classnames(styles.dismissButton, styles.rtlVRPos)}>
              <IconButton
                accessibilityLabel={
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel
                }
                icon="cancel"
                iconColor="darkGray"
                onClick={dismissButton.onDismiss}
                size="sm"
              />
            </div>
          )}
        </Flex>
      </Box>
      {/*
            MD BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={MESSAGING_TYPE_ATTRIBUTES[type]?.backgroundColor}
        dangerouslySetInlineStyle={{
          __style: isRtl
            ? { paddingRight: SEMA_SPACE_800, paddingLeft: SEMA_SPACE_1200 }
            : { paddingRight: SEMA_SPACE_1200, paddingLeft: SEMA_SPACE_800 },
        }}
        display="none"
        lgDisplay="none"
        paddingY={8}
        position="relative"
        rounding={4}
        smDisplay="block"
        width="100%"
      >
        <Flex direction="column" width="100%">
          <Flex.Item minWidth={0}>
            <Flex gap={6}>
              <Icon
                accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
                color={MESSAGING_TYPE_ATTRIBUTES[type]?.iconColor}
                icon={MESSAGING_TYPE_ATTRIBUTES[type]?.icon}
                size={32}
              />

              <Box maxWidth={648}>
                {(title || message) && (
                  <Flex direction="column" gap={2} width="100%">
                    {title && <Heading size="400">{title}</Heading>}
                    {message && typeof message === 'string' && <Text>{message}</Text>}
                    {message &&
                    typeof message !== 'string' &&
                    // @ts-expect-error - TS2339
                    Children.only<ReactElement>(message).type.displayName === 'Text'
                      ? message
                      : null}
                  </Flex>
                )}
              </Box>
            </Flex>
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Flex.Item flex="grow">
              <Box marginTop={6}>
                <Flex gap={2} height="100%" justifyContent="end" wrap>
                  {secondaryAction && (
                    <VRBannerCalloutAction data={secondaryAction} level="secondary" type={type} />
                  )}
                  {primaryAction && (
                    <VRBannerCalloutAction data={primaryAction} level="primary" type={type} />
                  )}
                </Flex>
              </Box>
            </Flex.Item>
          )}

          {dismissButton && (
            <div className={classnames(styles.dismissButton, styles.rtlVRPos)}>
              <IconButton
                accessibilityLabel={
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel
                }
                icon="cancel"
                iconColor="darkGray"
                onClick={dismissButton.onDismiss}
                size="sm"
              />
            </div>
          )}
        </Flex>
      </Box>
      {/*
            LG BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={MESSAGING_TYPE_ATTRIBUTES[type]?.backgroundColor}
        dangerouslySetInlineStyle={{
          __style: isRtl
            ? { paddingRight: SEMA_SPACE_800, paddingLeft: SEMA_SPACE_1200 }
            : { paddingRight: SEMA_SPACE_1200, paddingLeft: SEMA_SPACE_800 },
        }}
        display="none"
        lgDisplay="block"
        paddingY={8}
        position="relative"
        rounding={4}
        smDisplay="none"
        width="100%"
      >
        <Flex alignItems="center" width="100%" wrap>
          <Flex.Item minWidth={0}>
            <Flex gap={6}>
              <Icon
                accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
                color={MESSAGING_TYPE_ATTRIBUTES[type]?.iconColor}
                icon={MESSAGING_TYPE_ATTRIBUTES[type]?.icon}
                size={32}
              />

              <Box maxWidth={648}>
                {(title || message) && (
                  <Flex direction="column" gap={2} width="100%">
                    {title && <Heading size="400">{title}</Heading>}
                    {message && typeof message === 'string' && <Text>{message}</Text>}
                    {message &&
                    typeof message !== 'string' &&
                    // @ts-expect-error - TS2339
                    Children.only<ReactElement>(message).type.displayName === 'Text'
                      ? message
                      : null}
                  </Flex>
                )}
              </Box>
            </Flex>
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Flex.Item flex="grow">
              <Flex gap={2} height="100%" justifyContent="end" wrap>
                {secondaryAction && (
                  <VRBannerCalloutAction data={secondaryAction} level="secondary" type={type} />
                )}
                {primaryAction && (
                  <VRBannerCalloutAction data={primaryAction} level="primary" type={type} />
                )}
              </Flex>
            </Flex.Item>
          )}

          {dismissButton && (
            <div className={classnames(styles.dismissButton, styles.rtlVRPos)}>
              <IconButton
                accessibilityLabel={
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel
                }
                icon="cancel"
                iconColor="darkGray"
                onClick={dismissButton.onDismiss}
                size="sm"
              />
            </div>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

BannerCalloutAction.displayName = 'BannerCallout';
