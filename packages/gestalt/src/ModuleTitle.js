// @flow strict
import type { Node, Element } from 'react';
import Badge from './Badge.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';
import Text from './Text.js';

/**
 * https://gestalt.pinterest.systems/module
 */
export default function ModuleTitle(props: {|
  badgeText?: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  iconButton?: Element<typeof IconButton>,
  title: string,
  type?: 'error' | 'info',
|}): Node {
  const { iconAccessibilityLabel = '', title, type = 'info' } = props;

  const decoration = ['icon', 'badgeText', 'iconButton'].find((prop) => !!props[prop]);
  const hasError = type === 'error';
  const hasIcon = hasError || decoration === 'icon';
  const color = hasError ? 'red' : 'darkGray';

  return (
    <Flex alignItems="center" gap={2}>
      {hasIcon && (
        <Flex.Item minWidth={0}>
          <Icon
            accessibilityLabel={iconAccessibilityLabel}
            color={color}
            icon={hasError ? 'workflow-status-problem' : props.icon}
          />
        </Flex.Item>
      )}

      {title && (
        <Flex.Item minWidth={0}>
          <Text color={color} lineClamp={1} weight="bold">
            {title}
          </Text>
        </Flex.Item>
      )}

      {decoration === 'badgeText' && props.badgeText && (
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

      {decoration === 'iconButton' && <Flex.Item minWidth={0}>{props.iconButton}</Flex.Item>}
    </Flex>
  );
}
