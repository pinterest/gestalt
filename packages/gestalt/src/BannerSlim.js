// @flow strict
import { Children, type Element, Fragment, type Node as ReactNode } from 'react';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import Icon from './Icon';
import IconButton from './IconButton';
import Link from './Link';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES';
import Text from './Text';

type DismissButtonType = {
  accessibilityLabel?: string,
  onDismiss: () => void,
};

function DismissButton({ accessibilityLabel, onDismiss }: DismissButtonType) {
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('BannerSlim');
  return (
    <IconButton
      accessibilityLabel={accessibilityLabel ?? accessibilityDismissButtonLabel}
      icon="cancel"
      iconColor="darkGray"
      onClick={onDismiss}
      size="xs"
    />
  );
}

type HelperLinkType = {
  accessibilityLabel: string,
  href: string,
  onClick?: ({
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  }) => void,
  target?: null | 'self' | 'blank',
  text: string,
};

function HelperLink({ accessibilityLabel, href, onClick, target, text }: HelperLinkType) {
  return (
    <Text inline>
      <Link
        accessibilityLabel={accessibilityLabel}
        display="inlineBlock"
        href={href}
        onClick={onClick}
        target={target}
      >
        {text}
      </Link>
    </Text>
  );
}

type PrimaryActionType =
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      href: string,
      label: string,
      onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: 'none' | 'nofollow',
      role: 'link',
      target?: null | 'self' | 'blank',
    }
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      label: string,
      onClick: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
      role?: 'button',
    };

function PrimaryAction({ accessibilityLabel, disabled, label, ...props }: PrimaryActionType) {
  return props.role === 'link' ? (
    <ButtonLink
      accessibilityLabel={accessibilityLabel}
      color="white"
      disabled={disabled}
      fullWidth
      href={props.href}
      onClick={props.onClick}
      rel={props.rel}
      size="sm"
      target={props.target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="white"
      disabled={disabled}
      fullWidth
      onClick={props.onClick}
      size="sm"
      text={label}
    />
  );
}

type Props = {
  /**
   * Adds a dismiss button to BannerSlim. See the [Dismissible variant](https://gestalt.pinterest.systems/web/bannerslim#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerslim#Accessibility).
   *
   * Note that compact ("___Bare" type) BannerSlims are not dismissable.
   */
  dismissButton?: DismissButtonType,
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the message. See the [Message variant](https://gestalt.pinterest.systems/web/bannerslim#Message) to learn more.
   */
  helperLink?: HelperLinkType,
  /**
   * Label to describe the status icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerslim#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string,
  /**
   * Main content of BannerSlim. Content should be [localized](https://gestalt.pinterest.systems/web/bannerslim#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/bannerslim#Message) to learn more.
   *
   */
  message: string | Element<typeof Text>,
  /**
   * Main action for users to take on BannerSlim. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerslim#Accessibility).
   * See the [Primary action](https://gestalt.pinterest.systems/web/bannerslim#Primary-action) variant to learn more.
   *
   * Note that actions are not available on compact ("___Bare" type) BannerSlims.
   */
  primaryAction?: PrimaryActionType,
  /**
   * The type of BannerSlim. See the [variants](https://gestalt.pinterest.systems/web/bannerslim#Variants) to learn more.
   */
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'recommendation'
    | 'errorBare'
    | 'infoBare'
    | 'warningBare'
    | 'successBare'
    | 'recommendationBare',
};

/**
 * [BannerSlim](https://gestalt.pinterest.systems/web/bannerslim) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, BannerSlim sits inside of a container, and not at the top of the page. For alerts that apply to the whole page, use [BannerCallout](https://gestalt.pinterest.systems/web/bannercallout).
 *
 * ![BannerSlim light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerSlim.spec.mjs-snapshots/BannerSlim-chromium-darwin.png)
 * ![BannerSlim dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerSlim-dark.spec.mjs-snapshots/BannerSlim-dark-chromium-darwin.png)
 *
 */
export default function BannerSlim({
  dismissButton,
  helperLink,
  iconAccessibilityLabel,
  message,
  primaryAction,
  type = 'neutral',
}: Props): ReactNode {
  const isBare = type.endsWith('Bare');
  const isDefault = type === 'neutral';
  const { backgroundColor, iconColor, icon } = MESSAGING_TYPE_ATTRIBUTES[type.replace('Bare', '')];
  const {
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('BannerSlim');

  const getDefaultIconAccessibilityLabel = () => {
    switch (type) {
      case 'success':
      case 'successBare':
        return iconAccessibilityLabelSuccess;
      case 'info':
      case 'infoBare':
        return iconAccessibilityLabelInfo;
      case 'recommendation':
      case 'recommendationBare':
        return iconAccessibilityLabelRecommendation;
      case 'warning':
      case 'warningBare':
        return iconAccessibilityLabelWarning;
      case 'error':
      case 'errorBare':
        return iconAccessibilityLabelError;
      default:
        return '';
    }
  };
  // Buttons not allowed on compact BannerSlims
  const shouldShowButtons = !isBare && (primaryAction || dismissButton);

  return (
    <Box
      alignItems="center"
      color={isBare ? 'transparent' : backgroundColor}
      direction="column"
      display="flex"
      mdDirection="row"
      padding={isBare ? 0 : 4}
      paddingY={isBare ? 1 : 0}
      rounding={4}
      width="100%"
    >
      <Flex
        alignItems="start"
        flex="grow"
        gap={{ row: isBare ? 2 : 4, column: 0 }}
        mdAlignItems="center"
        width="100%"
      >
        {!isDefault && (
          <Flex.Item alignSelf={shouldShowButtons ? undefined : 'start'}>
            <Icon
              accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
              color={iconColor}
              icon={icon}
              size={16}
            />
          </Flex.Item>
        )}

        <Flex.Item flex="grow">
          <Box
            dangerouslySetInlineStyle={{
              __style: !isDefault ? { marginTop: '-1px' } : {},
            }}
          >
            {typeof message === 'string' ? (
              <Text inline>
                {message}
                {helperLink ? (
                  <Fragment>
                    {' '}
                    <HelperLink {...helperLink} />
                  </Fragment>
                ) : null}
              </Text>
            ) : null}
            {typeof message !== 'string' &&
            Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
              ? message
              : null}
          </Box>
        </Flex.Item>

        {shouldShowButtons && (
          <Flex.Item flex="none">
            <Flex alignItems="center" gap={{ row: 4, column: 0 }}>
              {primaryAction && (
                <Box display="none" flex="none" mdDisplay="flex">
                  <PrimaryAction {...primaryAction} />
                </Box>
              )}

              {dismissButton && <DismissButton {...dismissButton} />}
            </Flex>
          </Flex.Item>
        )}
      </Flex>
      {!isBare && primaryAction && (
        <Box alignSelf="end" display="flex" flex="none" marginTop={4} mdDisplay="none">
          <PrimaryAction {...primaryAction} />
        </Box>
      )}
    </Box>
  );
}

BannerSlim.displayName = 'BannerSlim';
