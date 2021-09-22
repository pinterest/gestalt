// @flow strict
import type { Node } from 'react';
import Badge from './Badge.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import type { ModuleTitleProps } from './moduleTypes.js';

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function ModuleTitle(props: ModuleTitleProps): Node {
  const { title, type = 'info' } = props;

  const TYPE_ICON_ATTRIBUTES = {
    info: props.icon
      ? {
          icon: props.icon,
          color: 'darkGray',
          accessibilityLabel: props.iconAccessibilityLabel,
        }
      : {},
    error: {
      icon: 'workflow-status-problem',
      color: 'red',
      accessibilityLabel: props.iconAccessibilityLabel,
    },
  };

  const { accessibilityLabel = '', color, icon: iconName } = TYPE_ICON_ATTRIBUTES[type];

  return (
    <Flex alignItems="center" gap={2}>
      {iconName && (
        <Flex.Item minWidth={0}>
          <Icon accessibilityLabel={accessibilityLabel} color={color} icon={iconName} />
        </Flex.Item>
      )}

      {title && (
        <Flex.Item minWidth={0}>
          <Text color={color} lineClamp={1} weight="bold">
            {title}
          </Text>
        </Flex.Item>
      )}

      {props.badgeText && (
        <Flex.Item minWidth={0}>
          <Box
            dangerouslySetInlineStyle={{ __style: { top: '1px' } }}
            marginStart={2}
            position="relative"
          >
            <Badge text={props.badgeText} />
          </Box>
        </Flex.Item>
      )}

      {props.iconButton && <Flex.Item minWidth={0}>{props.iconButton}</Flex.Item>}
    </Flex>
  );
}
