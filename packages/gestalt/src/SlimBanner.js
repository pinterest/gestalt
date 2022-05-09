// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Link from './Link.js';
import Text from './Text.js';
import Flex from './Flex.js';
import { MESSAGING_TYPE_ATTRIBUTES } from './messaging.js';

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
   * The type of status to display. See the [status variant](https://gestalt.pinterest.systems/slimbanner#Variants) to learn more.
   */
  status?: 'neutral' | 'error' | 'info' | 'warning' | 'success',
  /**
   * The type of SlimBanner. See the [type variant](https://gestalt.pinterest.systems/slimbanner#Variants) to learn more.
   */
  type?: 'default' | 'light',
|};

/**
 * [SlimBanner](https://gestalt.pinterest.systems/slimbanner) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, SectionAlerts sit inside of a section, and not at the top of the page. For alerts that apply to the whole page, use [SlimBanner](https://gestalt.pinterest.systems/slimbanner).
 *
 * ![SlimBanner light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner%20%230.png)
 * ![SlimBanner dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner-dark%20%230.png)
 *
 */
export default function SlimBanner({
  helperLink,
  iconAccessibilityLabel,
  message,
  status = 'neutral',
  type = 'default',
}: Props): Node {
  const colorText = status === 'default' || type === 'light' ? 'default' : 'dark';

  return (
    <Box
      color={type === 'light' ? 'transparent' : MESSAGING_TYPE_ATTRIBUTES[status].backgroundColor}
      padding={type === 'light' ? 0 : 4}
      paddingY={type === 'light' ? 1 : 0}
      rounding={4}
      width="100%"
      minWidth={320}
    >
      <Flex gap={type === 'light' ? 2 : 4}>
        {status !== 'default' && iconAccessibilityLabel ? (
          <Icon
            accessibilityLabel={iconAccessibilityLabel}
            color={MESSAGING_TYPE_ATTRIBUTES[status].iconColor}
            icon={MESSAGING_TYPE_ATTRIBUTES[status].icon}
            size={16}
          />
        ) : null}
        <Box
          dangerouslySetInlineStyle={{ __style: status !== 'default' ? { marginTop: '-1px' } : {} }}
        >
          <Text inline color={colorText}>
            {message}{' '}
            {helperLink ? (
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
            ) : null}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
