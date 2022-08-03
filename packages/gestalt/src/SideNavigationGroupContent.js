// @flow strict
import { type Node } from 'react';
import Badge from './Badge.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Box from './Box.js';
import icons from './icons/index.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';

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
}: {|
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
|}): Node {
  const deviceType = useDeviceType();

  const isMobile = deviceType === 'phone';

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
      <Flex gap={2} height="100%" width="100%">
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
            {(badge || notificationAccessibilityLabel) && (
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
            )}
          </Text>
        </Flex.Item>
        {counter && (
          <Flex.Item flex="none" alignSelf="center">
            <Box display="visuallyHidden">{`, `}</Box>
            <Box
              aria-label={counter.accessibilityLabel}
              role="status"
              marginEnd={display === 'static' ? -2 : undefined}
            >
              <Text align="end" color="default">
                {counter.number}
              </Text>
            </Box>
          </Flex.Item>
        )}
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
