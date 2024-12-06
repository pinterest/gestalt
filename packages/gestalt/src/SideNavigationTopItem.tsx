import { forwardRef, ReactElement, useId, useState } from 'react';
import classnames from 'classnames';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import icons from './icons/index';
import styles from './SideNavigation.css';
import ItemContent from './SideNavigation/ItemContent';
import TapAreaLink from './TapAreaLink';
import { Indexable } from './zIndex';

export type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
  };
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Indicates if row item is disabled and therefore inactive and non-interactive. See [disabled variant](https://gestalt.pinterest.systems/web/sidenavigation#Disabled) to learn more.
   */
  disabled?: boolean;
  /**
   * Directs users to the url when item is selected.
   */
  href: string;
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?:
    | keyof typeof icons
    | {
        __path: string;
      };
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Optional subtext for item labels. See the [Helper text](https://gestalt.pinterest.systems/web/sidenavigation#Helper-text) variant to learn more.
   */
  subtext?: string;
  /**
   * Label for the item.
   */
  label: string;
  /**
   * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
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
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement;
};

/**
 * Use [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to redirect the user to a different page or section. SideNavigation.TopItem must be used at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
const SideNavigationTopItemWithForwardRef = forwardRef<HTMLLIElement, Props>(
  function SideNavigationTopItem(
    {
      active,
      href,
      badge,
      counter,
      disabled,
      icon,
      label,
      subtext,
      primaryAction,
      notificationAccessibilityLabel,
      onClick,
    }: Props,
    ref,
  ) {
    const {
      collapsed: sideNavigationCollapsed,
      setSelectedItemId,
      setOverlayPreview,
    } = useSideNavigation();

    const itemId = useId();

    const [compression, setCompression] = useState<'compress' | 'none'>('compress');
    const [hovered, setHovered] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    return (
      <li ref={ref} className={classnames(styles.liItem)}>
        <TapAreaLink
          accessibilityCurrent={active}
          disabled={disabled}
          href={href}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTap={({ event, dangerouslyDisableOnNavigation }) => {
            setSelectedItemId(itemId);
            onClick?.({ event, dangerouslyDisableOnNavigation });

            if (sideNavigationCollapsed) setOverlayPreview(false);
          }}
          rounding={2}
          tapStyle={compression}
        >
          <ItemContent
            active={active}
            badge={badge}
            counter={counter}
            disabled={disabled}
            focused={focused}
            hovered={hovered}
            icon={icon}
            label={label}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            primaryAction={primaryAction}
            setCompression={setCompression}
            subtext={subtext}
          />
        </TapAreaLink>
      </li>
    );
  },
);

SideNavigationTopItemWithForwardRef.displayName = 'SideNavigation.TopItem';

export default SideNavigationTopItemWithForwardRef;
