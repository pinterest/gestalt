import { useEffect, useState } from 'react';
import { TOKEN_COLOR_BACKGROUND_SELECTED_BASE } from 'gestalt-design-tokens';
import PrimaryActionIconButton from './PrimaryActionIconButton';
import Badge from '../Badge';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Dropdown from '../Dropdown';
import Flex from '../Flex';
import Icon from '../Icon';
import icons from '../icons/index';
import Text from '../Text';
import { Indexable } from '../zIndex';

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

type Props = {
  hovered: boolean;
  focused: boolean;
  itemColor: 'secondary' | null | undefined;
  expanded: boolean;
  selectedItemId: string;
  itemId: string;
  paddingStyle:
    | {
        paddingInlineStart: string | number | undefined;
        paddingInlineEnd: string | number | undefined;
      }
    | Record<any, any>;
  icon?: IconType;
  label: string;
  badge?: BadgeType;
  notificationAccessibilityLabel?: string;
  counter?: Counter;
  display?: Display;
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
    // @ts-expect-error - TS2315 - Type 'Element' is not generic.
    dropdownItems?: ReadonlyArray<Element<typeof Dropdown.Item>>;
  };
  setCompression: (arg1: 'compress' | 'none') => void;
  hasActiveChild?: boolean;
};

export default function SideNavigationGroupContent({
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
  primaryAction,
  setCompression,
  hovered,
  focused,
  hasActiveChild,
}: Props) {
  // Manages adaptiveness
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { collapsed: sideNavigationCollapsed, overlayPreview } = useSideNavigation();

  // Manages PrimaryAction
  const [forceIconButton, setForceIconButton] = useState<'force' | 'default'>('default');
  const [showIconButton, setShowIconButton] = useState<'hide' | 'show'>('hide');

  useEffect(() => {
    if (!isMobile && primaryAction && showIconButton === 'hide' && (hovered || focused)) {
      setShowIconButton('show');
    }

    if (
      !isMobile &&
      primaryAction &&
      showIconButton === 'show' &&
      !hovered &&
      !focused &&
      forceIconButton === 'default'
    ) {
      setShowIconButton('hide');
    }
  }, [hovered, focused, primaryAction, forceIconButton, isMobile, showIconButton]);

  const hasBorder = sideNavigationCollapsed
    ? hasActiveChild
    : expanded && selectedItemId === itemId;

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  return (
    <Box
      alignItems="center"
      color={itemColor ?? undefined}
      dangerouslySetInlineStyle={{
        __style: hasBorder
          ? {
              border: `2px solid ${TOKEN_COLOR_BACKGROUND_SELECTED_BASE}`,
              ...paddingStyle,
            }
          : paddingStyle,
      }}
      display="flex"
      height={collapsed ? 44 : undefined}
      minHeight={44}
      padding={collapsed ? 3 : undefined}
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

      <Flex gap={{ row: 2, column: 0 }} height="100%" width="100%">
        {icon ? (
          <Flex.Item alignSelf="center">
            <Box aria-hidden={!collapsed}>
              {typeof icon === 'string' ? (
                <Icon
                  accessibilityLabel={collapsed ? label : ''}
                  color="default"
                  icon={icon}
                  inline
                  size={20}
                />
              ) : (
                <Icon
                  accessibilityLabel={collapsed ? label : ''}
                  color="default"
                  dangerouslySetSvgPath={icon}
                  inline
                  size={20}
                />
              )}
            </Box>
          </Flex.Item>
        ) : null}

        {!collapsed ? (
          <Flex.Item alignSelf="center" flex="grow">
            <Text color="default" inline>
              {label}
              {badge || notificationAccessibilityLabel ? (
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
              ) : null}
            </Text>
          </Flex.Item>
        ) : null}

        {!collapsed && counter && (showIconButton === 'hide' || isMobile) ? (
          <Flex.Item alignSelf="center" flex="none">
            <Box display="visuallyHidden">{`, `}</Box>
            <Box
              aria-label={counter.accessibilityLabel}
              marginEnd={display === 'static' ? -2 : undefined}
            >
              <Text align="end" color="subtle">
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
                  marginInline: '8px -8px',
                },
              }}
              rounding="circle"
            >
              <PrimaryActionIconButton
                dropdownItems={primaryAction?.dropdownItems}
                forceIconButton={forceIconButton}
                icon={primaryAction?.icon}
                isItemActive={false}
                onClick={primaryAction?.onClick}
                setCompression={setCompression}
                setForceIconButton={setForceIconButton}
                setShowIconButton={setShowIconButton}
                tooltip={primaryAction.tooltip}
              />
            </Box>
          </Flex.Item>
        ) : null}

        {/* @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
        {(!collapsed && ['expandable', 'expandableExpanded'].includes(display)) || isMobile ? (
          <Flex.Item alignSelf="center" flex="none">
            {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
            {/* @ts-expect-error - TS2322 - Type '{ children: Element; "aria-hidden": true; marginEnd: -2; marginStart: 2; rounding: "circle"; tabIndex: number; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'. */}
            <Box aria-hidden marginEnd={-2} marginStart={2} rounding="circle" tabIndex={-1}>
              <Icon
                accessibilityLabel=""
                color="default"
                icon={expanded ? 'arrow-up' : 'arrow-down'}
                size={12}
              />
            </Box>
          </Flex.Item>
        ) : null}
      </Flex>
    </Box>
  );
}
