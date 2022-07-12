// @flow strict
import { useState, useId, type Node } from 'react';
import classnames from 'classnames';
import styles from './SideNavigation.css';
import TapArea from './TapArea.js';
import Badge from './Badge.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Box from './Box.js';
import icons from './icons/index.js';
import { useNesting, NestingProvider } from './contexts/NestingProvider.js';
import { NESTING_MARGIN_START_MAP } from './SideNavigationItem.js';
import useGetChildrenToArray from './useGetChildrenToArray.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';

type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/SideNavigation#Badge) variant to learn more.
   */
  badge?: {|
    text: string,
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
  |},
  /**
   *
   */
  children: Node,
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/SideNavigation#Counter) variant to learn more.
   */
  counter?: {| number: string, accessibilityLabel: string |},

  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/SideNavigation#Icon) variant to learn more.
   */
  icon?: $Keys<typeof icons> | {| __path: string |},
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/SideNavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
  /**
   * Object detailing the label and value for this item.
   */
  item: {| label: string, value: string |},
|};

/**
 * Use [SideNavigation.ExpandableItem](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.ExpandableItem).
 */
export default function SideNavigationExpandableItem({
  children,
  item,
  badge,
  counter,
  icon,
  notificationAccessibilityLabel,
}: Props): Node {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const itemId = useId();

  const { nestedLevel } = useNesting();
  const { selectedItemId, setSelectedItemId } = useSideNavigation();

  const navigationChildren = useGetChildrenToArray({
    children,
    filterLevel: 'nested',
  });

  let itemColor;
  let textColor = 'default';

  if (hovered && !expanded) {
    itemColor = 'secondary';
    textColor = 'default';
  }

  const paddingStyle = {
    paddingInlineStart: NESTING_MARGIN_START_MAP[nestedLevel],
    paddingInlineEnd: '16px',
  };

  return (
    <li className={classnames(styles.liItem)}>
      <NestingProvider>
        <TapArea
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          rounding={2}
          tapStyle="compress"
          onTap={({ event }) =>
            setExpanded((value) => {
              if (!value) setSelectedItemId(itemId);
              return !value;
            })
          }
        >
          <Box
            color={itemColor}
            paddingY={2}
            minHeight={44}
            rounding={2}
            display="flex"
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style:
                expanded && selectedItemId === itemId
                  ? {
                      border: `2px solid var(--color-background-selected-base)`,
                      ...paddingStyle,
                    }
                  : paddingStyle,
            }}
          >
            <Flex gap={2} height="100%" width="100%">
              {icon ? (
                <Flex.Item alignSelf="center">
                  <Box aria-hidden>
                    {typeof icon === 'string' ? (
                      <Icon inline icon={icon} accessibilityLabel="" color={textColor} />
                    ) : (
                      <Icon
                        inline
                        dangerouslySetSvgPath={icon}
                        accessibilityLabel=""
                        color={textColor}
                      />
                    )}
                  </Box>
                </Flex.Item>
              ) : null}
              <Flex.Item alignSelf="center" flex="grow">
                <Text inline color={textColor}>
                  {item.label}
                  {(badge || notificationAccessibilityLabel) && (
                    <Box marginStart={1} display="inlineBlock" height="100%">
                      {/* Adds a pause for screen reader users between the text content */}
                      <Box display="visuallyHidden">{`, `}</Box>
                      {!notificationAccessibilityLabel && badge ? (
                        <Badge text={badge.text} type={badge.type} />
                      ) : null}
                      {notificationAccessibilityLabel ? (
                        <Box
                          aria-label={notificationAccessibilityLabel}
                          height={8}
                          width={8}
                          rounding="circle"
                          color="primary"
                          role="status"
                        />
                      ) : null}
                    </Box>
                  )}
                </Text>
              </Flex.Item>
              {counter && (
                <Flex.Item flex="none" alignSelf="center">
                  <Box display="visuallyHidden">{`, `}</Box>
                  <Box aria-label={counter.accessibilityLabel} role="status">
                    <Text align="end" color={textColor}>
                      {counter.number}
                    </Text>
                  </Box>
                </Flex.Item>
              )}
              <Flex.Item flex="none" alignSelf="center">
                {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
                <Box aria-hidden marginEnd={-2} marginStart={2} tabIndex={-1} rounding="circle">
                  <Icon
                    accessibilityLabel=""
                    icon={expanded ? 'arrow-up' : 'arrow-down'}
                    size={12}
                  />
                </Box>
              </Flex.Item>
            </Flex>
          </Box>
        </TapArea>
        <ul className={classnames(styles.ulItem)}>{expanded ? navigationChildren : null}</ul>
      </NestingProvider>
    </li>
  );
}

SideNavigationExpandableItem.displayName = 'SideNavigation.ExpandableItem';
