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
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem.js';
import useGetChildrenToArray from './useGetChildrenToArray.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';

type IconType = $Keys<typeof icons> | {| __path: string |};
type Display = 'expandable' | 'static';
type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
|};
type Counter = {| number: string, accessibilityLabel: string |};

function GroupContent({
  itemColor,
  expanded,
  selectedItemId,
  itemId,
  paddingStyle,
  icon,
  label,
  badge,
  notificationAccessibilityLabel,
  counter,
  display,
}: {|
  itemColor: ?'secondary',
  expanded: boolean,
  selectedItemId: string,
  itemId: string,
  paddingStyle: {|
    paddingInlineStart: string | number | void,
    paddingInlineEnd: string | number | void,
  |},
  icon?: IconType,
  label: string,
  badge?: BadgeType,
  notificationAccessibilityLabel?: string,
  counter?: Counter,
  display?: Display,
|}) {
  return (
    <Box
      color={itemColor ?? undefined}
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
                <Icon inline icon={icon} accessibilityLabel="" color="default" />
              ) : (
                <Icon inline dangerouslySetSvgPath={icon} accessibilityLabel="" color="default" />
              )}
            </Box>
          </Flex.Item>
        ) : null}
        <Flex.Item alignSelf="center" flex="grow">
          <Text inline color="default">
            {label}
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
            <Box
              aria-label={counter.accessibilityLabel}
              role="status"
              marginEnd={display === 'static' ? -2 : undefined}
            >
              <Text align="end" color="default">
                {counter.number}
              </Text>
            </Box>
          </Flex.Item>
        )}
        {display === 'expandable' ? (
          <Flex.Item flex="none" alignSelf="center">
            {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
            <Box aria-hidden marginEnd={-2} marginStart={2} tabIndex={-1} rounding="circle">
              <Icon accessibilityLabel="" icon={expanded ? 'arrow-up' : 'arrow-down'} size={12} />
            </Box>
          </Flex.Item>
        ) : null}
      </Flex>
    </Box>
  );
}

type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/SideNavigation#Badge) variant to learn more.
   */
  badge?: BadgeType,
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: Node,
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/SideNavigation#Counter) variant to learn more.
   */
  counter?: Counter,
  /**
   * Nested directories can be static or expandable. See [nested directory](#Nested-directory) variant for more information.
   */
  display?: Display,
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/SideNavigation#Icon) variant to learn more.
   */
  icon?: IconType,
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/SideNavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
|};

/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.Group).
 */
export default function SideNavigationGroup({
  children,
  badge,
  counter,
  display = 'expandable',
  icon,
  label,
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

  const itemColor = hovered ? 'secondary' : undefined;

  const paddingStyle = {
    paddingInlineStart: NESTING_MARGIN_START_MAP[nestedLevel],
    paddingInlineEnd: '16px',
  };

  return (
    <li className={classnames(styles.liItem)}>
      <NestingProvider>
        {display === 'expandable' ? (
          <TapArea
            accessibilityControls={display === 'expandable' ? itemId : undefined}
            accessibilityExpanded={display === 'expandable' ? expanded : undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            rounding={2}
            tapStyle="compress"
            onTap={() =>
              setExpanded((value) => {
                if (!value) setSelectedItemId(itemId);
                return !value;
              })
            }
          >
            <GroupContent
              itemColor={itemColor}
              expanded={expanded}
              selectedItemId={selectedItemId}
              itemId={itemId}
              paddingStyle={paddingStyle}
              icon={icon}
              label={label}
              badge={badge}
              notificationAccessibilityLabel={notificationAccessibilityLabel}
              counter={counter}
              display={display}
            />
          </TapArea>
        ) : (
          <GroupContent
            itemColor={itemColor}
            expanded={expanded}
            selectedItemId={selectedItemId}
            itemId={itemId}
            paddingStyle={paddingStyle}
            icon={icon}
            label={label}
            badge={badge}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            counter={counter}
            display={display}
          />
        )}
        {expanded || display === 'static' ? (
          <ul id={itemId} className={classnames(styles.ulItem)}>
            {navigationChildren}
          </ul>
        ) : null}
      </NestingProvider>
    </li>
  );
}

SideNavigationGroup.displayName = 'SideNavigation.Group';
