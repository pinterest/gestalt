// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Text from './Text.js';

// eslint-disable-next-line import/prefer-default-export
export function renderModuleTitle(
  type: string,
  icon?: string,
  iconAccessibilityLabel?: string,
  title?: string
): Node {
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
  return (
    <>
      {MODULE_TYPE_ATTRIBUTES[type].icon && (
        <Box marginEnd={2}>
          <Icon
            icon={MODULE_TYPE_ATTRIBUTES[type].icon}
            accessibilityLabel={iconAccessibilityLabel || ''}
            color={MODULE_TYPE_ATTRIBUTES[type].color}
          />
        </Box>
      )}
      <Text weight="bold" truncate color={MODULE_TYPE_ATTRIBUTES[type].color}>
        {title}
      </Text>
    </>
  );
}
