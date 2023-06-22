// @flow strict
import { type Element, type Node, useId, useState } from 'react';
import classnames from 'classnames';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import { NestingProvider, useNesting } from './contexts/NestingProvider.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';
import Dropdown from './Dropdown.js';
import icons from './icons/index.js';
import styles from './SideNavigation.css';
import getChildrenToArray from './SideNavigation/getChildrenToArray.js';
import SideNavigationGroupContent from './SideNavigation/GroupContent.js';
import SideNavigationGroupMobile from './SideNavigation/GroupMobile.js';
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem.js';
import TapArea from './TapArea.js';
import { type Indexable } from './zIndex.js';

type IconType = $Keys<typeof icons> | {| __path: string |};
type Display = 'expandable' | 'static';

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
|};

type Counter = {| number: string, accessibilityLabel: string |};

export type Props = {|
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: BadgeType,
  /**
   * Content of the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  children: Node,
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: Counter,
  /**
   * Nested directories can be static or expandable. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  display?: Display,
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?: IconType,
  /**
   * Label for the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  label: string,
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
  /**
   * The primary action for each group. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {|
    icon?: 'ellipsis' | 'edit' | 'trash-can',
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLDivElement>
        | SyntheticKeyboardEvent<HTMLDivElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
    |}) => void,
    tooltip: {|
      accessibilityLabel?: string,
      text: string,
      zIndex?: Indexable,
    |},
    dropdownItems?: $ReadOnlyArray<Element<typeof Dropdown.Item>>,
  |},
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
  primaryAction,
}: Props): Node {
  // Manages adaptiveness
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Manages PrimaryAction
  const [compression, setCompression] = useState<'compress' | 'none'>('compress');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Manages children
  const itemId = useId();

  const { nestedLevel } = useNesting();

  const { selectedItemId, setSelectedItemId } = useSideNavigation();

  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'nested',
  });

  const hasActiveChildCallback = (child: {| props: {| active: 'page' | 'section' |} |}) =>
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

  const [expanded, setExpanded] = useState(hasAnyActiveChild);

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
        primaryAction={primaryAction}
      >
        {navigationChildren}
      </SideNavigationGroupMobile>
    );
  }

  return (
    <li className={classnames(styles.liItem)}>
      <NestingProvider componentName="SideNavigation" maxNestedLevels={2}>
        {display === 'expandable' ? (
          <TapArea
            accessibilityControls={display === 'expandable' ? itemId : undefined}
            accessibilityExpanded={display === 'expandable' ? expanded : undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rounding={2}
            tapStyle={compression}
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
              primaryAction={primaryAction}
              setCompression={setCompression}
              hovered={hovered}
              focused={focused}
            />
          </TapArea>
        ) : (
          <SideNavigationGroupContent
            hovered={hovered}
            focused={focused}
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
            primaryAction={primaryAction}
            setCompression={setCompression}
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
