// @flow strict
import { Children, isValidElement, type Element, type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Link from './Link.js';
import Mask from './Mask.js';
import Button from './Button.js';
import Text from './Text.js';
import styles from './Toast.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import ToastPrimaryAction from './ToastPrimaryAction.js';
import useInExperiment from './useInExperiment.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';

const TOAST_MAX_WIDTH_PX = 500;
const TOAST_WIDTH_PX = 330;

const EXP_SIZE_THUMBNAIL = 32;
const EXP_SIZE_ICON = 24;

type Props = {|
  /**
   * Allows to insert a custom button for user interaction. Do not use except for allowed cases where primaryAction doesn't support functionality required in it.
   */
  _dangerouslySetPrimaryAction?: Node,
  /**
   * Adds an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  primaryAction?: {|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
    rel?: $ElementType<React$ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<React$ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<React$ElementConfig<typeof Link>, 'target'>,
  |},

  /**
   * Main content of Toast. Content should be [localized](https://gestalt.pinterest.systems/web/toast#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/toast#Text) to learn more.
   */
  text: string | Element<typeof Text>,
  /**
   * An optional thumbnail image to displayed next to the text.
   */
  thumbnail?: Node,
  /**
   * The masked shape of the thumbnail.
   */
  thumbnailShape?: 'circle' | 'square',
  /**
   * Use the `'error'` variant to indicate an error message. Generally not recommended given the ephemeral nature of Toasts.
   */
  variant?: 'default' | 'error',
|};

/**
 * [Toasts](https://gestalt.pinterest.systems/web/toast) can educate people on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.
 *
 * Toast is purely visual. In order to properly handle the showing and dismissing of Toasts, as well as any animations, you will need to implement a Toast manager.
 *
 * ![Toast light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Toast.spec.mjs-snapshots/Toast-chromium-darwin.png)
 */
export default function Toast({
  primaryAction,
  text,
  thumbnail,
  thumbnailShape = 'square',
  variant = 'default',
  _dangerouslySetPrimaryAction,
}: Props): Node {
  const inToastExp = useInExperiment({
    webExperimentName: 'web_gestalt_redesigned_toast',
    mwebExperimentName: 'mweb_gestalt_redesigned_toast',
  });

  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
  const isErrorVariant = variant === 'error';

  const responsiveMinWidth = useResponsiveMinWidth();
  const isMobileWidth = responsiveMinWidth === 'xs';

  let containerColor = isDarkMode ? 'light' : 'dark';
  let textColor = isDarkMode ? 'dark' : 'light';

  let textElement: Element<'span'> | string;

  if (typeof text === 'string') {
    textElement = text;
  }

  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  if (typeof text !== 'string' && Children.only(text).type.displayName === 'Text') {
    let textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    if (isErrorVariant) {
      textColorOverrideStyles = inToastExp
        ? styles.textErrorColorOverrideLight
        : styles.textColorOverrideLight;
    }

    textElement = <span className={textColorOverrideStyles}>{text}</span>;
  }

  // Error variant does not currently support dark mode
  if (isErrorVariant) {
    containerColor = 'errorBase';
    textColor = 'inverse';
  }

  const hasPrimaryAction = primaryAction || _dangerouslySetPrimaryAction;

  if (inToastExp) {
    const toastContent = (
      <Box color={containerColor} paddingX={4} paddingY={3} width="100%" rounding={4}>
        <Flex alignItems="center" gap={4}>
          {!!thumbnail && !isErrorVariant ? (
            <Flex.Item flex="none">
              <Mask
                height={EXP_SIZE_THUMBNAIL}
                rounding={thumbnailShape === 'circle' ? 'circle' : 2}
                width={EXP_SIZE_THUMBNAIL}
              >
                {thumbnail}
              </Mask>
            </Flex.Item>
          ) : null}
          {isErrorVariant ? (
            <Flex.Item flex="none">
              <Icon
                color="inverse"
                icon="workflow-status-problem"
                accessibilityLabel="problem"
                size={EXP_SIZE_ICON}
              />
            </Flex.Item>
          ) : null}
          <Flex.Item flex="grow">
            <Text
              weight={isErrorVariant ? 'bold' : undefined}
              align="start"
              color={textColor}
              lineClamp={2}
            >
              {textElement}
            </Text>
          </Flex.Item>

          {primaryAction || _dangerouslySetPrimaryAction ? (
            // Allow button text to wrap on mobile
            <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
              {isValidElement(_dangerouslySetPrimaryAction) ? _dangerouslySetPrimaryAction : null}
              {!_dangerouslySetPrimaryAction &&
              primaryAction?.accessibilityLabel &&
              primaryAction?.label ? (
                <ToastPrimaryAction
                  accessibilityLabel={primaryAction.accessibilityLabel}
                  href={primaryAction.href}
                  rel={primaryAction?.rel}
                  size="sm"
                  target={primaryAction?.target}
                  label={primaryAction.label}
                  onClick={primaryAction.onClick}
                />
              ) : null}
            </Flex.Item>
          ) : null}
        </Flex>
      </Box>
    );
    return (
      <div className={styles.toast} role="status">
        {toastContent}
      </div>
    );
  }

  return (
    <Box
      marginBottom={3}
      // Ensure that maxWidth isn't greater than viewport width (for small screens)
      maxWidth={`min(${TOAST_MAX_WIDTH_PX}px, 100vw)`}
      minWidth={TOAST_WIDTH_PX}
      paddingX={4}
      role="status"
      // Button text and text can be long, so allow toast to expand
      // to max width if button is present
      width={hasPrimaryAction ? undefined : TOAST_WIDTH_PX}
    >
      <Box color={containerColor} fit padding={6} rounding="pill">
        <Flex alignItems="center" gap={{ row: 4, column: 0 }}>
          {thumbnail ? (
            <Flex.Item flex="none">
              <Mask height={48} rounding={thumbnailShape === 'circle' ? 'circle' : 2} width={48}>
                {thumbnail}
              </Mask>
            </Flex.Item>
          ) : null}
          <Flex.Item flex="grow">
            <Text align={!thumbnail && !primaryAction ? 'center' : 'start'} color={textColor}>
              {textElement}
            </Text>
          </Flex.Item>
          {primaryAction || _dangerouslySetPrimaryAction ? (
            // Allow button text to wrap on mobile
            <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
              {isValidElement(_dangerouslySetPrimaryAction) ? _dangerouslySetPrimaryAction : null}
              {!_dangerouslySetPrimaryAction &&
              primaryAction?.accessibilityLabel &&
              primaryAction?.label ? (
                <ToastPrimaryAction
                  accessibilityLabel={primaryAction.accessibilityLabel}
                  href={primaryAction.href}
                  rel={primaryAction?.rel}
                  target={primaryAction?.target}
                  label={primaryAction.label}
                  onClick={primaryAction.onClick}
                />
              ) : null}
            </Flex.Item>
          ) : null}
        </Flex>
      </Box>
    </Box>
  );
}
