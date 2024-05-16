import { ReactElement, ReactNode, useEffect, useId, useState } from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_400 } from 'gestalt-design-tokens';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { NestingProvider, useNesting } from './contexts/NestingProvider';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import icons from './icons/index';
import styles from './SideNavigation.css';
import SideNavigationGroupContent from './SideNavigation/GroupContent';
import SideNavigationGroupMobile from './SideNavigation/GroupMobile';
import { getChildrenActiveProp, validateChildren } from './SideNavigation/navigationChildrenUtils';
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem';
import TapArea from './TapArea';
import { flattenChildrenWithKeys } from './utils/flattenChildren';
import { Indexable } from './zIndex';

type IconType =
  | keyof typeof icons
  | {
      __path: string;
    };
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
  badge,
  children,
  counter,
  display = 'expandable',
  expanded: expandedProp,
  icon,
  notificationAccessibilityLabel,
  label,
  onExpand,
  primaryAction,
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
  const { nestedLevel } = useNesting();
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

  const [expanded, setExpanded] = useState<boolean>(hasAnyActiveChild);
  const [isExpanded, setIsExpanded] = useState<boolean>(hasAnyActiveChild);

  useEffect(() => {
    if (display === 'static') {
      setIsExpanded(true);
    } else if (display === 'expandable' && expandedProp === undefined) {
      setIsExpanded(expanded);
    } else if (display === 'expandable' && expandedProp !== undefined) {
      setIsExpanded(expandedProp);
    }
  }, [display, expanded, expandedProp]);

  const itemColor = hovered ? 'secondary' : undefined;

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  const paddingStyle = !collapsed
    ? {
        // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '0': "var(--space-400)"; readonly '1': "var(--space-1200)"; readonly '2': "68px"; }'.
        paddingInlineStart: NESTING_MARGIN_START_MAP[nestedLevel],
        paddingInlineEnd: TOKEN_SPACE_400,
      }
    : {};

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
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTap={() => {
              if (display === 'expandable' && expandedProp === undefined) {
                setExpanded((value) => {
                  if (!value) setSelectedItemId(itemId);
                  return !value;
                });
              } else {
                onExpand?.({ expanded: !isExpanded });
              }

              if (collapsed) {
                setOverlayPreview(true);
              }
            }}
            rounding={2}
            tapStyle={compression}
          >
            <SideNavigationGroupContent
              badge={badge}
              counter={counter}
              display={display}
              expanded={isExpanded}
              focused={focused}
              hasActiveChild={hasAnyActiveChild}
              hovered={hovered}
              icon={icon}
              itemColor={itemColor}
              itemId={itemId}
              label={label}
              notificationAccessibilityLabel={notificationAccessibilityLabel}
              paddingStyle={paddingStyle}
              primaryAction={primaryAction}
              selectedItemId={selectedItemId}
              setCompression={setCompression}
            />
          </TapArea>
        ) : (
          <SideNavigationGroupContent
            badge={badge}
            counter={counter}
            display={display}
            expanded={isExpanded}
            focused={focused}
            hasActiveChild={hasAnyActiveChild}
            hovered={hovered}
            icon={icon}
            itemColor={itemColor}
            itemId={itemId}
            label={label}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            paddingStyle={paddingStyle}
            primaryAction={primaryAction}
            selectedItemId={selectedItemId}
            setCompression={setCompression}
          />
        )}
        {!collapsed && isExpanded ? (
          <ul className={classnames(styles.ulItem)} id={itemId}>
            {navigationChildren}
          </ul>
        ) : null}
      </NestingProvider>
    </li>
  );
}

SideNavigationGroup.displayName = 'SideNavigation.Group';
