// @flow strict
import type { Node } from 'react';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import icons from './icons/index.js';
import { type TypeOptions } from './moduleTypes.js';

type TitleProps = {|
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  title: string,
  type: TypeOptions,
|};

export default function ModuleTitle({
  icon,
  iconAccessibilityLabel,
  title,
  type = 'info',
}: TitleProps): Node {
  const MODULE_TYPE_ATTRIBUTES = {
    info: {
      icon,
      color: 'darkGray',
    },
    error: {
      icon: 'workflow-status-problem',
      color: 'red',
    },
  };

  const { color, icon: iconName } = MODULE_TYPE_ATTRIBUTES[type];

  return (
    <Flex gap={2}>
      {iconName && (
        <Icon accessibilityLabel={iconAccessibilityLabel ?? ''} color={color} icon={iconName} />
      )}

      <Text color={color} truncate weight="bold">
        {title}
      </Text>
    </Flex>
  );
}
