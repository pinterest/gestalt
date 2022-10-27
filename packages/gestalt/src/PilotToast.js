// @flow strict
import { cloneElement, type Element, type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Text from './Text.js';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import { ToastMessage, ToastTypeThumbnail } from './PilotToastComponents.js';

const TOAST_MAX_WIDTH_PX = 716;
const TOAST_WIDTH_PX = 330;
const TOAST_MIN_HEIGHT_PX = 56;
const TEXT_MAX_WIDTH_PX = 127;

const THUMBNAIL_WIDTH = 32;

type Props = {|
  /**
   * Add an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  button?: Node,
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the subtext. See the [XXX variant](https://gestalt.pinterest.systems/web/pageheader#Subtext) to learn more.
   */
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
  /**
   * Use string for guide toasts (one line of text) and React.Node for confirmation toasts (complex text, potentially containing a Link). Do not specify a Text color within this property, as the color is automatically determined based on the `variant`.
   */
  text: string,
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
  type?: 'success' | 'error' | 'progress',
|};

/**
 * [PilotToasts](https://gestalt.pinterest.systems/web/toast) can educate people on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.
 *
 * PilotToasts is purely visual. In order to properly handle the showing and dismissing of Toasts, as well as any animations, you will need to implement a Toast manager.
 *
 * ![PilotToasts light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Toast.spec.mjs-snapshots/Toast-chromium-darwin.png)
 */
export default function PilotToast({
  button,
  helperLink,
  text,
  thumbnail,
  thumbnailShape = 'square',
  type,
}: Props): Node {
  const isErrorToast = type === 'error';
  const isProgressToast = type === 'progress';
  const isSuccessToast = type === 'success';
  const isNeutralToast = !isErrorToast && !isProgressToast && !isSuccessToast;
  const isTextOnlyToast = isNeutralToast && !thumbnail && !button;

  const responsiveMinWidth = useResponsiveMinWidth();
  const isMobileWidth = responsiveMinWidth === 'xs';

  let containerColor = 'inverse';
  let textColor = 'inverse';

  // Error variant does not currently support dark mode
  if (isErrorToast) {
    containerColor = 'errorBase';
    textColor = 'light';
  }

  if (isProgressToast) {
    containerColor = 'secondary';
    textColor = 'default';
  }

  if (isErrorToast) {
    containerColor = 'errorBase';
    textColor = 'light';
  }

  const hasImage = thumbnail != null;
  const hasButton = button != null;

  return (
    <Box
      borderStyle="shadow"
      color={containerColor}
      // Ensure that maxWidth isn't greater than viewport width (for small screens)
      maxWidth={`min(${TOAST_MAX_WIDTH_PX}px, 100vw)`}
      minHeight={TOAST_MIN_HEIGHT_PX}
      paddingX={4}
      paddingY={3}
      role="status"
      // Button text and text can be long, so allow toast to expand
      // to max width if button is present
      rounding={4}
    >
      <Flex alignItems="center" gap={4}>
        <Flex.Item flex={isTextOnlyToast ? undefined : 'grow'}>
          <Flex gap={2}>
            {isNeutralToast && thumbnail ? (
              <Flex.Item flex="none">
                <Mask
                  height={THUMBNAIL_WIDTH}
                  rounding={thumbnailShape === 'circle' ? 'circle' : 2}
                  width={THUMBNAIL_WIDTH}
                >
                  {thumbnail}
                </Mask>
              </Flex.Item>
            ) : null}

            {type ? (
              <Flex.Item flex="none">
                <ToastTypeThumbnail type={type} />
              </Flex.Item>
            ) : null}

            <Flex.Item>
              <ToastMessage
                align={!thumbnail && !button ? 'center' : 'start'}
                text={text}
                helperLink={helperLink}
                textColor={textColor}
                type={type}
              />
            </Flex.Item>
          </Flex>
        </Flex.Item>
        {isNeutralToast && button ? (
          // Allow button text to wrap on mobile
          <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
            {cloneElement(button, { size: 'sm' })}
          </Flex.Item>
        ) : null}
      </Flex>
    </Box>
  );
}
