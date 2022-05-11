// @flow strict
import { Fragment, type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Link from './Link.js';
import Text from './Text.js';
import Flex from './Flex.js';
import { MESSAGING_TYPE_ATTRIBUTES } from './messaging.js';

const SLIMBANNER_MIN_WIDTH = 320;

type Props = {|
  /**
   * Helper [Link](https://gestalt.pinterest.systems/link) to be placed after the message. See the [helperLink variant](https://gestalt.pinterest.systems/slimbanner#helperLink) to learn more.
   */
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},

  /**
   * Label to describe the status icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/slimbanner#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string,
  /**
   * Main content of SlimBanner. Content should be [localized](https://gestalt.pinterest.systems/slimbanner#Localization).
   *
   */
  message: string,
  /**
   * The type of SlimBanner. See the [variants](https://gestalt.pinterest.systems/slimbanner#Variants) to learn more.
   */
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'errorLite'
    | 'infoLite'
    | 'warningLite'
    | 'successLite',
|};

/**
 * [SlimBanner](https://gestalt.pinterest.systems/slimbanner) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, SlimBanner sits inside of a section, and not at the top of the page. For alerts that apply to the whole page, use [SlimBanner](https://gestalt.pinterest.systems/slimbanner).
 *
 * ![SlimBanner light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner%20%230.png)
 * ![SlimBanner dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner-dark%20%230.png)
 *
 */
export default function SlimBanner({
  helperLink,
  iconAccessibilityLabel,
  message,
  type = 'neutral',
}: Props): Node {
  const isLite = ['errorLite', 'infoLite', 'warningLite', 'successLite'].includes(type);
  const isDefault = type === 'default';
  const colorText = isDefault || isLite ? 'default' : 'dark';
  const statusMap = {
    'errorLite': 'error',
    'infoLite': 'info',
    'warningLite': 'warning',
    'successLite': 'success',
  };
  const { backgroundColor, iconColor, icon } =
    MESSAGING_TYPE_ATTRIBUTES[
      type === 'errorLite' ||
      type === 'infoLite' ||
      type === 'warningLite' ||
      type === 'successLite'
        ? statusMap[type]
        : type
    ];

  return (
    <Box
      color={isLite ? 'transparent' : backgroundColor}
      padding={isLite ? 0 : 4}
      paddingY={isLite ? 1 : 0}
      rounding={4}
      width="100%"
      minWidth={SLIMBANNER_MIN_WIDTH}
    >
      <Flex gap={isLite ? 2 : 4}>
        {!isDefault && iconAccessibilityLabel ? (
          <Icon
            accessibilityLabel={iconAccessibilityLabel}
            color={iconColor}
            icon={icon}
            size={16}
          />
        ) : null}
        <Box dangerouslySetInlineStyle={{ __style: !isDefault ? { marginTop: '-1px' } : {} }}>
          <Text inline color={colorText}>
            {message}
            {helperLink ? (
              <Fragment>
                {' '}
                <Text inline color={colorText}>
                  <Link
                    accessibilityLabel={helperLink.accessibilityLabel}
                    href={helperLink.href}
                    onClick={helperLink.onClick}
                    target="blank"
                    inline
                  >
                    {helperLink.text}
                  </Link>
                </Text>
              </Fragment>
            ) : null}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
