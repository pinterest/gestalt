import { type ReactElement, type ReactNode, useId, useState } from 'react';
import classnames from 'classnames';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { NestingProvider } from './contexts/NestingProvider';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import type icons from './icons/index';
import styles from './SideNavigation.css';
import SideNavigationGroupContent from './SideNavigation/GroupContent';
import SideNavigationGroupItemTapControl from './SideNavigation/GroupItemTapControl';
import SideNavigationGroupMobile from './SideNavigation/GroupMobile';
import { getChildrenActiveProp, validateChildren } from './SideNavigation/navigationChildrenUtils';
import { flattenChildrenWithKeys } from './utils/flattenChildren';
import { type Indexable } from './zIndex';

type IconType = keyof typeof icons | { __path: string };
type Display = 'expandable' | 'static';
type BadgeType = {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
};
type Counter = {
  number: string;
  accessibilityLabel: string;
};

export type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. Available only when `href` prop is present. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: BadgeType;
  /**
   * Content of the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  children: ReactNode;
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: Counter;
  /**
   * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  display?: Display;
  /**
   * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more. This functionality is not supported in mobile.
   */
  expanded?: boolean;
  /**
   * Directs users to the url when item is selected. Available only for Desktop.
   */
  href?: string;
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?: IconType;
  /**
   * Label for the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  label: string;
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard. Available only when `href` prop is present.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Callback fired when the expand button component is clicked and the component is controlled.This functionality is not supported in mobile.
   */
  onExpand?: (arg1: { expanded: boolean }) => void;
  /**
   * The primary action for each group. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }) => void;
    tooltip: {
      accessibilityLabel?: string;
      text: string;
      zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<ReactElement>;
  };
};

/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group) to hold SideNavigation.NestedItem and SideNavigation.NestedGroup at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
export default function SideNavigationGroup({
  active,
  badge,
  children,
  counter,
  display = 'expandable',
  expanded: expandedProp,
  icon,
  notificationAccessibilityLabel,
  label,
  onClick,
  onExpand,
  primaryAction,
  href,
}: Props) {
  // Manages adaptiveness
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Manages PrimaryAction
  const [compression, setCompression] = useState<'compress' | 'none'>('compress');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Manages children
  const itemId = useId();

  const {
    collapsed: sideNavigationCollapsed,
    overlayPreview,
    setOverlayPreview,
    selectedItemId,
    setSelectedItemId,
  } = useSideNavigation();

  const navigationChildren = flattenChildrenWithKeys(children);
  const hasAnyActiveChild = !!getChildrenActiveProp(navigationChildren);

  validateChildren({ children: navigationChildren, filterLevel: 'nested' });

  const isExpandable = display === 'expandable';
  const isUncontrolled = expandedProp === undefined;
  const isLink = !!href;

  const [expanded, setExpanded] = useState<boolean>(hasAnyActiveChild || !isExpandable);
  const isExpanded = isUncontrolled ? expanded : expandedProp;

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  const handleExpand = () => {
    if (isUncontrolled) {
      setExpanded((value) => !value);
    } else {
      onExpand?.({ expanded: !isExpanded });
    }
  };

  const handleTap = () => {
    // Always `true` when item is not a link.
    // When item is a link and not expanded, allows expanding in the first click.
    const shoudlToggleExpand = !isLink || (isLink && !isExpanded);

    if (shoudlToggleExpand) {
      handleExpand();
    }

    if (!isExpanded && selectedItemId !== itemId) setSelectedItemId(itemId);

    if (collapsed) {
      setOverlayPreview(true);
    }
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
    <NestingProvider componentName="SideNavigation" maxNestedLevels={2}>
      <li className={classnames(styles.liItem)}>
        <SideNavigationGroupItemTapControl
          accessibilityControls={itemId}
          accessibilityCurrent={active === 'page' ? active : undefined}
          accessibilityExpanded={isExpanded}
          href={href}
          isExpandable={isExpandable}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onLinkClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTap={handleTap}
          tapStyle={compression}
        >
          <SideNavigationGroupContent
            active={active}
            badge={badge}
            counter={counter}
            display={display}
            expanded={isExpanded}
            expandIconButtonProps={{
              accessibilityControls: itemId,
              accessibilityExpanded: isExpanded,
              onTap: handleExpand,
            }}
            focused={focused}
            hasActiveChild={hasAnyActiveChild}
            hovered={hovered}
            icon={icon}
            isLink={isLink}
            itemId={itemId}
            label={label}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            primaryAction={primaryAction}
            selectedItemId={selectedItemId}
            setCompression={setCompression}
          />
        </SideNavigationGroupItemTapControl>

        {!collapsed && isExpanded ? (
          <ul className={classnames(styles.ulItem)} id={itemId}>
            {navigationChildren}
          </ul>
        ) : null}
      </li>
    </NestingProvider>
  );
}

SideNavigationGroup.displayName = 'SideNavigation.Group';
