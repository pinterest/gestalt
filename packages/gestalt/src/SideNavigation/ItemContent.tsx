import { ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  TOKEN_COLOR_BACKGROUND_SELECTED_BASE,
  TOKEN_SPACE_400,
  TOKEN_SPACE_1200,
} from 'gestalt-design-tokens';
import PrimaryActionIconButton from './PrimaryActionIconButton';
import Badge from '../Badge';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import { useNesting } from '../contexts/NestingProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Flex from '../Flex';
import Icon from '../Icon';
import icons from '../icons/index';
import Text from '../Text';
import { Indexable } from '../zIndex';

export const NESTING_MARGIN_START_MAP = {
  '0': TOKEN_SPACE_400,
  '1': TOKEN_SPACE_1200,
  '2': '68px',
} as const;

type IconType = keyof typeof icons | { __path: string };

type BadgeType = {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
};

type Counter = {
  number: string;
  accessibilityLabel: string;
};

type PrimaryAction = {
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

export type Props = {
  active?: 'page' | 'section';
  hovered: boolean;
  focused: boolean;
  badge?: BadgeType;
  counter?: Counter;
  icon?: IconType;
  label: string;
  notificationAccessibilityLabel?: string;
  primaryAction?: PrimaryAction;
  setCompression: (arg1: 'compress' | 'none') => void;
  hasBorder?: boolean;
  isGroup?: boolean;
  children?: ReactNode;
};

export default function ItemContent({
  active,
  badge,
  counter,
  icon,
  label,
  primaryAction,
  notificationAccessibilityLabel,
  setCompression,
  hovered,
  focused,
  hasBorder,
  isGroup,
  children,
}: Props) {
  const { nestedLevel: level } = useNesting();
  const nestedLevel = isGroup
    ? level - 1 // compensate for NestingLevelProvider always wrapping ItemContent in SideNavigationGroup
    : level;

  const isTopLevel = nestedLevel === 0;

  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { collapsed: sideNavigationCollapsed, overlayPreview } = useSideNavigation();

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

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  const inactiveItemColor = hovered ? 'secondary' : undefined;
  const itemColor = active ? 'selected' : inactiveItemColor;
  const textColor = active ? 'inverse' : 'default';
  const counterColor = active ? 'inverse' : 'subtle';

  const nestingMargin = isMobile
    ? // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '0': "var(--space-400)"; readonly '1': "var(--space-1200)"; readonly '2': "68px"; }'.
      NESTING_MARGIN_START_MAP[isTopLevel ? 0 : nestedLevel - 1]
    : // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '0': "var(--space-400)"; readonly '1': "var(--space-1200)"; readonly '2': "68px"; }'.
      NESTING_MARGIN_START_MAP[nestedLevel];

  return (
    <Box
      alignItems="center"
      color={itemColor}
      dangerouslySetInlineStyle={{
        __style: {
          border: hasBorder ? `2px solid ${TOKEN_COLOR_BACKGROUND_SELECTED_BASE}` : undefined,
          paddingInlineStart: collapsed ? undefined : nestingMargin,
          paddingInlineEnd: collapsed ? undefined : TOKEN_SPACE_400,
        },
      }}
      display="flex"
      height={collapsed ? 44 : undefined}
      justifyContent={collapsed ? 'center' : undefined}
      minHeight={collapsed ? undefined : 44}
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

      <Flex
        alignItems="center"
        flex="grow"
        gap={{ row: 2, column: 0 }}
        height="100%"
        justifyContent={collapsed ? 'center' : undefined}
      >
        {icon ? (
          <Flex.Item>
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
          <Flex.Item flex="grow">
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

        {!collapsed && counter ? (
          <Flex.Item flex="none">
            <Box display="visuallyHidden">{`, `}</Box>
            <Box aria-label={counter.accessibilityLabel}>
              <Text align="end" color={counterColor}>
                {counter.number}
              </Text>
            </Box>
          </Flex.Item>
        ) : null}

        {!collapsed && primaryAction ? (
          <Flex.Item flex="none">
            {/* This is a workaround to announce the counter as it's replaced on focus */}
            {counter ? (
              <Box display="visuallyHidden">
                {`, `}
                <Box aria-label={counter?.accessibilityLabel} />
              </Box>
            ) : null}
            <Box aria-hidden marginEnd={-2} rounding="circle">
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

        {children}
      </Flex>
    </Box>
  );
}
