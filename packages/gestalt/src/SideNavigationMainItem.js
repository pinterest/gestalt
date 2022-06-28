// @flow strict
import { type Node } from 'react';
import TapArea from './TapArea.js';
import Badge from './Badge.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Box from './Box.js';
import icons from './icons/index.js';

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/dropdown#Badges) variant to learn more.
   */
  badge?: BadgeType,
  /**
   *
   */
  counter?: string,
  /**
   *
   */
  href: string,
  /**
   *
   */
  icon?: $Keys<typeof icons> | {| __path: string |},
  /**
   *
   */
  notification: boolean,
  /**
   *
   */
  text: string,
|};

/**
 * Use [SideNavigation.MainItem](https://gestalt.pinterest.systems/sideNavigation)
 */
export default function SideNavigationMainItem({
  href,
  text,
  badge,
  counter,
  icon,
  notification,
}: Props): Node {
  return (
    <TapArea role="link" href={href}>
      <Box padding={4} rounding={2} borderStyle="sm">
        <Flex gap={2} alignContent="center">
          {icon ? (
            <Box aria-hidden>
              {typeof icon === 'string' ? (
                <Icon inline icon={icon} accessibilityLabel="" color="default" />
              ) : (
                <Icon inline dangerouslySetSvgPath={icon} accessibilityLabel="" color="default" />
              )}
            </Box>
          ) : null}
          <Text inline>
            {text}
            {badge && (
              <Box marginStart={1} display="inlineBlock">
                {/* Adds a pause for screen reader users between the text content */}
                <Box display="visuallyHidden">{`, `}</Box>
                <Badge text={badge.text} type={badge.type} />
              </Box>
            )}
          </Text>

          {notification && <Box rounding="circle" color="primary"></Box>}

          {counter && (
            <Flex.Item flex="grow" alignSelf="center">
              <Text align="end">{counter}</Text>
            </Flex.Item>
          )}
        </Flex>
      </Box>
    </TapArea>
  );
}

// displayName is necessary for children identification in Dropdown
SideNavigationMainItem.displayName = 'SideNavigation.MainItem';
