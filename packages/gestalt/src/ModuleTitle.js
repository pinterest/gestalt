// @flow strict
import { type Node } from 'react';
import Badge from './Badge.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import { type BaseModuleTitleProps, type TypeOptions } from './moduleTypes.js';

type Props = {|
  ...BaseModuleTitleProps,
  title: string, // overwriting to be required
  type: TypeOptions, // overwriting to be required
|};

export default function ModuleTitle({
  badgeText,
  icon,
  iconAccessibilityLabel,
  title,
  type = 'info',
}: Props): Node {
  const TYPE_ICON_ATTRIBUTES = {
    info: {
      icon,
      color: 'darkGray',
    },
    error: {
      icon: 'workflow-status-problem',
      color: 'red',
    },
  };

  const { color, icon: iconName } = TYPE_ICON_ATTRIBUTES[type];

  return (
    <Flex gap={2}>
      {iconName && (
        <Icon accessibilityLabel={iconAccessibilityLabel ?? ''} color={color} icon={iconName} />
      )}

      <Flex.Item minWidth={0}>
        <Text color={color} truncate weight="bold">
          {title}
        </Text>
      </Flex.Item>

      {badgeText && (
        <Box
          dangerouslySetInlineStyle={{ __style: { top: '1px' } }}
          marginStart={2}
          position="relative"
        >
          <Badge text={badgeText} />
        </Box>
      )}
    </Flex>
  );
}
