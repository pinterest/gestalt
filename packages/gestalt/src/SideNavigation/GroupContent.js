// @flow strict
import { type Element, type Node, useEffect, useState } from 'react';
import PrimaryActionIconButton from './PrimaryActionIconButton.js';
import Badge from '../Badge.js';
import Box from '../Box.js';
import { useDeviceType } from '../contexts/DeviceTypeProvider.js';
import Dropdown from '../Dropdown.js';
import Flex from '../Flex.js';
import Icon from '../Icon.js';
import icons from '../icons/index.js';
import Text from '../Text.js';
import { type Indexable } from '../zIndex.js';

type IconType = $Keys<typeof icons> | {| __path: string |};
type Display = 'expandable' | 'static';
type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
|};
type Counter = {| number: string, accessibilityLabel: string |};

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
}: {|
  hovered: boolean,
  focused: boolean,
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
  setCompression: ('compress' | 'none') => void,
|}): Node {
  // Manages adaptiveness
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

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
      <Flex gap={{ row: 2, column: 0 }} height="100%" width="100%">
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
            {badge || notificationAccessibilityLabel ? (
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
            ) : null}
          </Text>
        </Flex.Item>
        {counter && (showIconButton === 'hide' || isMobile) ? (
          <Flex.Item flex="none" alignSelf="center">
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

        {(showIconButton === 'show' || isMobile) && primaryAction ? (
          <Flex.Item flex="none" alignSelf="center">
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
                icon={primaryAction?.icon}
                onClick={primaryAction?.onClick}
                tooltip={primaryAction.tooltip}
                dropdownItems={primaryAction?.dropdownItems}
                setCompression={setCompression}
                forceIconButton={forceIconButton}
                setForceIconButton={setForceIconButton}
                setShowIconButton={setShowIconButton}
                isItemActive={false}
              />
            </Box>
          </Flex.Item>
        ) : null}
        {display === 'expandable' || isMobile ? (
          <Flex.Item flex="none" alignSelf="center">
            {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
            <Box aria-hidden marginEnd={-2} marginStart={2} tabIndex={-1} rounding="circle">
              <Icon
                color="default"
                accessibilityLabel=""
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
