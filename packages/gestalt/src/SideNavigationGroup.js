// @flow strict
import { useState, useId, type Node } from 'react';
import classnames from 'classnames';
import styles from './SideNavigation.css';
import TapArea from './TapArea.js';
import SideNavigationGroupContent from './SideNavigationGroupContent.js';
import SideNavigationGroupMobile from './SideNavigationGroupMobile.js';
import icons from './icons/index.js';
import { useNesting, NestingProvider } from './contexts/NestingProvider.js';
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem.js';
import getChildrenToArray from './getChildrenToArray.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';

type IconType = $Keys<typeof icons> | {| __path: string |};
type Display = 'expandable' | 'static';
type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
|};
type Counter = {| number: string, accessibilityLabel: string |};

export type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/SideNavigation#Badge) variant to learn more.
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
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/SideNavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
|};

/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group) to hold SideNavigation.NestedItem and SideNavigation.NestedGroup at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
export default function SideNavigationGroup({
  badge,
  children,
  counter,
  display = 'expandable',
  icon,
  notificationAccessibilityLabel,
  label,
}: Props): Node {
  const itemId = useId();

  const { nestedLevel } = useNesting();

  const { selectedItemId, setSelectedItemId } = useSideNavigation();

  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'nested',
  });

  const hasActiveChildCallback = (child) =>
    child?.props?.active && ['page', 'section'].includes(child?.props?.active);

  const hasActiveChildren = !!navigationChildren.find(hasActiveChildCallback);

  let hasActiveGrandChildren;

  if (nestedLevel === 0 && !hasActiveChildren) {
    hasActiveGrandChildren = navigationChildren
      .filter((child) => child?.type?.displayName === 'SideNavigation.NestedGroup')
      .map((child) =>
        getChildrenToArray({
          children: child?.props?.children,
          filterLevel: 'nested',
        }).find(hasActiveChildCallback),
      )
      .filter(Boolean);
  }

  const hasAnyActiveChild =
    !!hasActiveChildren || (!!hasActiveGrandChildren && !!hasActiveGrandChildren[0]);

  const [hovered, setHovered] = useState(false);

  const [expanded, setExpanded] = useState(hasAnyActiveChild);

  const deviceType = useDeviceType();

  const isMobile = deviceType === 'phone';

  const itemColor = hovered ? 'secondary' : undefined;

  const paddingStyle = {
    paddingInlineStart: NESTING_MARGIN_START_MAP[nestedLevel],
    paddingInlineEnd: '16px',
  };

  if (isMobile) {
    return (
      <SideNavigationGroupMobile
        badge={badge}
        counter={counter}
        display={display}
        hasActiveChild={hasAnyActiveChild}
        icon={icon}
        label={label}
        notificationAccessibilityLabel={notificationAccessibilityLabel}
      >
        {navigationChildren}
      </SideNavigationGroupMobile>
    );
  }

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
            <SideNavigationGroupContent
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
          <SideNavigationGroupContent
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
