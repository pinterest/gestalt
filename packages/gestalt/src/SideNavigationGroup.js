// @flow strict
import { type Element, type Node as ReactNode, useEffect, useId, useState } from 'react';
import classnames from 'classnames';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { NestingProvider, useNesting } from './contexts/NestingProvider';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import Dropdown from './Dropdown';
import icons from './icons/index';
import styles from './SideNavigation.css';
import getChildrenToArray from './SideNavigation/getChildrenToArray';
import SideNavigationGroupContent from './SideNavigation/GroupContent';
import SideNavigationGroupMobile from './SideNavigation/GroupMobile';
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem';
import TapArea from './TapArea';
import { type Indexable } from './zIndex';

type IconType = $Keys<typeof icons> | { __path: string };
type Display = 'expandable' | 'static';

type BadgeType = {
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
};

type Counter = { number: string, accessibilityLabel: string };

export type Props = {
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: BadgeType,
  /**
   * Content of the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  children: ReactNode,
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: Counter,
  /**
   * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  display?: Display,
  /**
   * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  expanded?: boolean,
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
   * Callback fired when the expand button component is clicked and the component is controlled.
   */
  onExpand?: ({ expanded: boolean }) => void,
  /**
   * The primary action for each group. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {
    icon?: 'ellipsis' | 'edit' | 'trash-can',
    onClick?: ({
      event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
    }) => void,
    tooltip: {
      accessibilityLabel?: string,
      text: string,
      zIndex?: Indexable,
    },
    dropdownItems?: $ReadOnlyArray<Element<typeof Dropdown.Item>>,
  },
};

/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group) to hold SideNavigation.NestedItem and SideNavigation.NestedGroup at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
export default function SideNavigationGroup({
  badge,
  children,
  counter,
  display = 'expandable',
  expanded: groupExpanded,
  icon,
  notificationAccessibilityLabel,
  label,
  onExpand,
  primaryAction,
}: Props): ReactNode {
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

  const hasActiveChildCallback = (child: { props: { active: 'page' | 'section' } }) =>
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

  const isExpandable = display === 'expandable';

  const [expanded, setExpanded] = useState<boolean>(hasAnyActiveChild);
  const [isExpanded, setIsExpanded] = useState<boolean>(hasAnyActiveChild);

  useEffect(() => {
    if (display === 'static') {
      setIsExpanded(true);
    } else if (display === 'expandable' && groupExpanded === undefined) {
      setIsExpanded(expanded);
    } else if (display === 'expandable' && groupExpanded !== undefined) {
      setIsExpanded(groupExpanded);
    }
  }, [display, expanded, groupExpanded]);

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
        {isExpandable ? (
          <TapArea
            accessibilityControls={itemId}
            accessibilityExpanded={isExpanded}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rounding={2}
            tapStyle={compression}
            onTap={() => {
              if (display === 'expandable' && groupExpanded === undefined) {
                setExpanded((value) => {
                  if (!value) setSelectedItemId(itemId);
                  return !value;
                });
              } else {
                onExpand?.({ expanded: !isExpanded });
              }
            }}
          >
            <SideNavigationGroupContent
              itemColor={itemColor}
              expanded={isExpanded}
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
            expanded={isExpanded}
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
        {isExpanded ? (
          <ul id={itemId} className={classnames(styles.ulItem)}>
            {navigationChildren}
          </ul>
        ) : null}
      </NestingProvider>
    </li>
  );
}

SideNavigationGroup.displayName = 'SideNavigation.Group';
