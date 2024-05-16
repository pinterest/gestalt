import { ReactElement, forwardRef, ReactNode, useEffect, useId, useState } from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_400, TOKEN_SPACE_1200 } from 'gestalt-design-tokens';
import Badge from './Badge';
import Box from './Box';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { useNesting } from './contexts/NestingProvider';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import Dropdown from './Dropdown';
import Flex from './Flex';
import Icon from './Icon';
import icons from './icons/index';
import styles from './SideNavigation.css';
import PrimaryActionIconButton from './SideNavigation/PrimaryActionIconButton';
import TapAreaLink from './TapAreaLink';
import Text from './Text';
import { Indexable } from './zIndex';

export const NESTING_MARGIN_START_MAP = {
  '0': TOKEN_SPACE_400,
  '1': TOKEN_SPACE_1200,
  '2': '68px',
} as const;

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
    dropdownItems?: ReadonlyArray<Element<typeof Dropdown.Item>>;
  };
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement; // eslint-disable-line react/no-unused-prop-types
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
      icon,
      label,
      primaryAction,
      notificationAccessibilityLabel,
      onClick,
    }: Props,
    ref,
  ): ReactNode {
    const { nestedLevel } = useNesting();

    const {
      collapsed: sideNavigationCollapsed,
      overlayPreview,
      setSelectedItemId,
      setOverlayPreview,
    } = useSideNavigation();

    const itemId = useId();

    const deviceType = useDeviceType();

    const isMobile = deviceType === 'mobile';

    const isTopLevel = nestedLevel === 0;

    const [compression, setCompression] = useState<'compress' | 'none'>('compress');

    const [forceIconButton, setForceIconButton] = useState<'force' | 'default'>('default');

    const [hovered, setHovered] = useState<boolean>(false);

    const [focused, setFocused] = useState<boolean>(false);

    const [showIconButton, setShowIconButton] = useState<'hide' | 'show'>('hide');

    let itemColor = active ? 'selected' : undefined;
    let textColor = active ? 'inverse' : 'default';
    const counterColor = active ? 'inverse' : 'subtle';

    if (hovered && !active) {
      itemColor = 'secondary';
      textColor = 'default';
    }

    const nestingMargin = isMobile
      ? NESTING_MARGIN_START_MAP[isTopLevel ? 0 : nestedLevel - 1]
      : NESTING_MARGIN_START_MAP[nestedLevel];

    useEffect(() => {
      if (primaryAction && showIconButton === 'hide' && (hovered || focused)) {
        setShowIconButton('show');
      }

      if (
        primaryAction &&
        showIconButton === 'show' &&
        !hovered &&
        !focused &&
        forceIconButton === 'default'
      ) {
        setShowIconButton('hide');
      }
    }, [hovered, focused, primaryAction, forceIconButton, showIconButton]);

    const collapsed = sideNavigationCollapsed && !overlayPreview;

    return (
      <li ref={ref} className={classnames(styles.liItem)}>
        <TapAreaLink
          accessibilityCurrent={active === 'page' ? active : undefined}
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
          <Box
            alignItems="center"
            color={itemColor}
            dangerouslySetInlineStyle={
              collapsed
                ? undefined
                : {
                    __style: {
                      paddingInlineStart: nestingMargin,
                      paddingInlineEnd: '16px',
                    },
                  }
            }
            display="flex"
            justifyContent={collapsed ? 'center' : undefined}
            minHeight={44}
            paddingY={collapsed ? undefined : 2}
            position="relative"
            rounding={2}
            width={collapsed ? 44 : undefined}
          >
            {collapsed && icon && notificationAccessibilityLabel ? (
              <Box
                aria-label={notificationAccessibilityLabel}
                color="primary"
                dangerouslySetInlineStyle={{ __style: { top: 4, right: 4 } }}
                height={8}
                position="absolute"
                role="status"
                rounding="circle"
                width={8}
              />
            ) : null}

            <Flex
              gap={{ row: 2, column: 0 }}
              height="100%"
              justifyContent={collapsed ? 'center' : undefined}
              width="100%"
            >
              {icon ? (
                <Flex.Item alignSelf="center">
                  <Box aria-hidden={!collapsed}>
                    {typeof icon === 'string' ? (
                      <Icon
                        accessibilityLabel={collapsed ? label : ''}
                        color={textColor}
                        icon={icon}
                        inline
                        size={20}
                      />
                    ) : (
                      <Icon
                        accessibilityLabel={collapsed ? label : ''}
                        color={textColor}
                        dangerouslySetSvgPath={icon}
                        inline
                        size={20}
                      />
                    )}
                  </Box>
                </Flex.Item>
              ) : null}

              {!collapsed && (
                <Flex.Item alignSelf="center" flex="grow">
                  <Text color={textColor} inline>
                    {label}
                    {(badge || notificationAccessibilityLabel) && (
                      <Box display="inlineBlock" height="100%" marginStart={1}>
                        {/* Adds a pause for screen reader users between the text content */}
                        <Box display="visuallyHidden">{`, `}</Box>
                        {!notificationAccessibilityLabel && badge ? (
                          <Badge text={badge.text} type={badge.type} />
                        ) : null}
                        {notificationAccessibilityLabel ? (
                          <Box
                            aria-label={notificationAccessibilityLabel}
                            color="primary"
                            height={8}
                            role="status"
                            rounding="circle"
                            width={8}
                          />
                        ) : null}
                      </Box>
                    )}
                  </Text>
                </Flex.Item>
              )}

              {!collapsed && counter && (showIconButton === 'hide' || isMobile) ? (
                <Flex.Item alignSelf="center" flex="none">
                  <Box display="visuallyHidden">{`, `}</Box>
                  {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
                  <Box aria-label={counter.accessibilityLabel} marginEnd={-2}>
                    <Text align="end" color={counterColor}>
                      {counter.number}
                    </Text>
                  </Box>
                </Flex.Item>
              ) : null}

              {!collapsed && (showIconButton === 'show' || isMobile) && primaryAction ? (
                <Flex.Item alignSelf="center" flex="none">
                  {/* This is a workaround to announce the counter as it's replaced on focus */}
                  {counter ? (
                    <Box display="visuallyHidden">
                      {`, `}
                      <Box aria-label={counter?.accessibilityLabel} />
                    </Box>
                  ) : null}
                  <Box
                    aria-hidden
                    dangerouslySetInlineStyle={{
                      __style: {
                        marginInline: '14px -14px',
                      },
                    }}
                    rounding="circle"
                  >
                    <PrimaryActionIconButton
                      dropdownItems={primaryAction?.dropdownItems}
                      forceIconButton={forceIconButton}
                      icon={primaryAction?.icon}
                      isItemActive={!!active}
                      onClick={primaryAction?.onClick}
                      setCompression={setCompression}
                      setForceIconButton={setForceIconButton}
                      setShowIconButton={setShowIconButton}
                      tooltip={primaryAction.tooltip}
                    />
                  </Box>
                </Flex.Item>
              ) : null}
            </Flex>
          </Box>
        </TapAreaLink>
      </li>
    );
  },
);

SideNavigationTopItemWithForwardRef.displayName = 'SideNavigation.TopItem';

export default SideNavigationTopItemWithForwardRef;
